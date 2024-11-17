package main
import (
        "database/sql"
        "github.com/gin-gonic/gin"
        _ "github.com/mattn/go-sqlite3"
        "log"
        "net/http"
		"encoding/json"
)
type customNull struct {
sql.NullString;
}

func (s *customNull) MarshalJSON() ([]byte, error) {
    if s.Valid {
        return json.Marshal(s.String)
    }
    return json.Marshal("")
}

type Recipe struct {
		Id         int            `json:"id"`
		Img        customNull	  `json:"img"`
		Href       customNull     `json:"href"`
		Label      string         `json:"label"`
		Alt        string         `json:"alt"`
		CategoryId int            `json:"category_id"`
		IsPinned   bool           `json:"is_pinned"`
		Category   string         `json:"category"`
}
type RouteHandler struct {
	DB *sql.DB
}
type Category struct {
		Id         int            `json:"id"`
		Category   string         `json:"category"`
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
func (r *RouteHandler) pinnedRecipes (c *gin.Context) {
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
