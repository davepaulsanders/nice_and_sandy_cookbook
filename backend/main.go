package main

import (
        "database/sql"
        "github.com/gin-gonic/gin"
        _ "github.com/mattn/go-sqlite3"
		"github.com/gin-contrib/cors"
        "log"
		"time"
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

		r.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"*"},
			AllowMethods:     []string{"GET"},
			AllowHeaders:     []string{"Origin"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			AllowOriginFunc: func(origin string) bool {
			  return origin == "https://github.com"
			},
			MaxAge: 12 * time.Hour,
  }))
		handler := &RouteHandler{} 

		if err = handler.setUp(db); err != nil {
			log.Fatalf("Error setting up RouteHandler")
		}

		v1 := r.Group("/v1") 
        v1.GET("/healthz", handler.healthCheck)
		v1.GET("/favicon.ico", handler.faviconNoContent)
		v1.GET("/categories", handler.categories) 
        v1.GET("/recipes", handler.recipes)
        v1.GET("/recipes/pinned", handler.pinnedRecipes)
        r.Run()
}
