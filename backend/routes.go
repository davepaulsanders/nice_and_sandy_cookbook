package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/net/html"
	"log"
	"net/http"
	"net/url"
	"strings"
)

type customNull struct {
	sql.NullString
}

func (s *customNull) MarshalJSON() ([]byte, error) {
	if s.Valid {
		return json.Marshal(s.String)
	}
	return json.Marshal("")
}

type Image struct {
	Img string
	Alt string
}
type Recipe struct {
	Id         int        `json:"id"`
	Img        customNull `json:"img"`
	Href       customNull `json:"href"`
	Label      string     `json:"label"`
	Alt        string     `json:"alt"`
	CategoryId int        `json:"category_id"`
	IsPinned   bool       `json:"is_pinned"`
	Category   *string    `json:"category"`
}
type RouteHandler struct {
	DB *sql.DB
}
type Category struct {
	Id       int    `json:"id"`
	Category string `json:"category"`
}

func (r *RouteHandler) setUp(db *sql.DB) error {
	r.DB = db
	if err := r.DB.Ping(); err != nil {
		return err
	}
	return nil
}

func (r *RouteHandler) healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "healthy",
	})
}
func (r *RouteHandler) faviconNoContent(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

func (r *RouteHandler) categories(c *gin.Context) {
	var categories []Category
	resp, err := r.DB.Query("SELECT * FROM categories;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer resp.Close()
	for resp.Next() {
		var category Category
		if err := resp.Scan(&category.Id, &category.Category); err != nil {
			log.Fatal(err)
		}
		categories = append(categories, category)
	}
	c.JSON(http.StatusOK, gin.H{
		"categories": categories,
	})

}

func (r *RouteHandler) recipes(c *gin.Context) {
	var recipes []Recipe
	resp, err := r.DB.Query("SELECT a.*, b.category FROM recipes as a join categories as b on a.category_id = b.id;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer resp.Close()
	for resp.Next() {
		var recipe Recipe
		if err := resp.Scan(&recipe.Id, &recipe.Img, &recipe.Href, &recipe.Label, &recipe.Alt, &recipe.CategoryId, &recipe.IsPinned, &recipe.Category); err != nil {
			log.Fatal(err)
		}
		recipes = append(recipes, recipe)
	}
	c.JSON(http.StatusOK, gin.H{
		"recipes": recipes,
	})
}
func (r *RouteHandler) pinnedRecipes(c *gin.Context) {
	var recipes []Recipe
	resp, err := r.DB.Query("SELECT * FROM recipes WHERE is_pinned = true;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer resp.Close()
	for resp.Next() {
		var recipe Recipe
		if err := resp.Scan(&recipe.Id, &recipe.Img, &recipe.Href, &recipe.Label, &recipe.Alt, &recipe.CategoryId, &recipe.IsPinned); err != nil {
			log.Fatal(err)
		}
		recipes = append(recipes, recipe)
	}
	c.JSON(http.StatusOK, gin.H{
		"recipes": recipes,
	})

}
func (r *RouteHandler) togglePinnedRecipes(c *gin.Context) {
	//var recipes []Recipe
	id := c.Param("id")
	resp, err := r.DB.Exec("UPDATE recipes SET is_pinned = NOT is_pinned WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	rowsAffected, err := resp.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Recipe not found"})
		return
	}
	grabRow, err := r.DB.Query(fmt.Sprintf("SELECT * FROM recipes WHERE id = %s", id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer grabRow.Close()
	var recipe Recipe
	for grabRow.Next() {
		if err := grabRow.Scan(&recipe.Id, &recipe.Img, &recipe.Href, &recipe.Label, &recipe.Alt, &recipe.CategoryId, &recipe.IsPinned); err != nil {
			log.Fatal(err)
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"updated_recipe": recipe,
	})
}
func (r *RouteHandler) addRecipe(c *gin.Context) {
	var body struct {
		URL string `json:"url"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	parsed, err := url.Parse(body.URL)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	hostname := parsed.Hostname()
	client := &http.Client{}

	req, err := http.NewRequest("GET", body.URL, nil)
	if err != nil {
		panic(err)
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	defer resp.Body.Close()

	tokenizer := html.NewTokenizer(resp.Body)
	var imageList []Image
	var title string
	seen := make(map[string]bool)
	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken:
			if len(imageList) > 0 {
				c.JSON(200, gin.H{"images": imageList, "label": title, "href": body.URL})
			} else {
				c.JSON(200, gin.H{"images": nil, "label": title, "href": body.URL})
			}
			return

		case html.StartTagToken, html.SelfClosingTagToken:
			t := tokenizer.Token()
			if t.Data == "title" {
				tt = tokenizer.Next()
				if tt == html.TextToken {
					title = strings.TrimSpace(tokenizer.Token().Data)
				}
			}
			if t.Data == "img" {
				var tmpImage Image
				// Look for the 'src' attribute
				for _, attr := range t.Attr {
					if attr.Key == "alt" {
						tmpImage.Alt = attr.Val
					}
					if attr.Key == "src" {
						parsed, err := url.Parse(attr.Val)
						if err != nil {
							c.JSON(400, gin.H{"error": err.Error()})
							return
						}
						imageHostName := parsed.Hostname()
						if hostname == imageHostName {
							if !seen[attr.Val] {
								seen[attr.Val] = true
								tmpImage.Img = attr.Val
							}
						}
					}
				}
				if tmpImage.Alt != "" && tmpImage.Img != "" {
					imageList = append(imageList, Image{Img: tmpImage.Img, Alt: tmpImage.Alt})
				}
			}
		}
	}

}
