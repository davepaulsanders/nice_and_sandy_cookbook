package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
	models "recipes-backend/db"
	rp "recipes-backend/recipeparser"
)

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
	var recipes []models.Recipe
	resp, err := r.DB.Query("SELECT a.*, b.category FROM recipes as a join categories as b on a.category_id = b.id;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer resp.Close()
	for resp.Next() {
		var recipe models.Recipe
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
	var recipes []models.Recipe
	resp, err := r.DB.Query("SELECT * FROM recipes WHERE is_pinned = true;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	defer resp.Close()
	for resp.Next() {
		var recipe models.Recipe
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
	var recipe models.Recipe
	for grabRow.Next() {
		if err := grabRow.Scan(&recipe.Id, &recipe.Img, &recipe.Href, &recipe.Label, &recipe.Alt, &recipe.CategoryId, &recipe.IsPinned); err != nil {
			log.Fatal(err)
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"updated_recipe": recipe,
	})
}

func (r *RouteHandler) parseUrl(c *gin.Context) {
	var body struct {
		URL string `json:"url"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	parser := &rp.RecipeParser{URL: body.URL}

	_, err := parser.ParseHostName()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
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
	parsedRecipe, err := parser.ParseData(resp.Body)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, parsedRecipe)
	return
}
