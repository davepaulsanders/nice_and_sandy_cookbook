package main
import (
        "database/sql"
        "github.com/gin-gonic/gin"
        _ "github.com/mattn/go-sqlite3"
        "log"
        "net/http"
)

type RouteHandler struct {
	DB *sql.DB

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
                type Category struct {
                        Id         int            `json:"id"`
                        Category   string         `json:"category"`
                }
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
                resp, err := r.DB.Query("SELECT * FROM recipes;")
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
func (r *RouteHandler) pinnedRecipes (c *gin.Context) {
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
