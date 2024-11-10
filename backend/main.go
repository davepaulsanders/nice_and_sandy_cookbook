package main

import (
        "database/sql"
        "github.com/gin-gonic/gin"
        _ "github.com/mattn/go-sqlite3"
        "log"
        "net/http"
)

func main() {
        db, err := sql.Open("sqlite3", "./recipes.db")
        if err != nil {
                log.Fatal(err)
        }
        err = loadData(db)
        if err != nil {
                log.Fatal(err)
        }
        defer db.Close()
        r := gin.Default()
        r.GET("/healthz", func(c *gin.Context) {
                c.JSON(http.StatusOK, gin.H{
                        "message": "healthy",
                })
        })
		r.GET("/favicon.ico", func(c *gin.Context) {
			    c.Status(http.StatusNoContent)  
		})
		r.GET("/categories", func (c *gin.Context) {
                type Category struct {
                        Id         int            `json:"id"`
                        Category   string         `json:"category"`
                }
                var categories []Category
                resp, err := db.Query("SELECT * FROM categories;")
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

		})
        r.GET("/recipes", func(c *gin.Context) {

                type Recipe struct {
                        Id         int            `json:"id"`
                        Img        sql.NullString `json:"img"`
                        Href       sql.NullString `json:"href"`
                        Label      string         `json:"label"`
                        Alt        string         `json:"alt"`
                        CategoryId int            `json:"category_id"`
                        IsPinned   bool           `json:"is_pinned"`
                }
                var recipes []Recipe
                resp, err := db.Query("SELECT * FROM recipes;")
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
        })
        r.GET("/recipes/pinned", func(c *gin.Context) {

                type Recipe struct {
                        Id         int            `json:"id"`
                        Img        sql.NullString `json:"img"`
                        Href       sql.NullString `json:"href"`
                        Label      string         `json:"label"`
                        Alt        string         `json:"alt"`
                        CategoryId int            `json:"category_id"`
                        IsPinned   bool           `json:"is_pinned"`
                }
                var recipes []Recipe
                resp, err := db.Query("SELECT * FROM recipes WHERE is_pinned = true;")
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
        })
        r.Run()
}
