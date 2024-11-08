package main

import (
  "net/http"
  "database/sql"
  "github.com/gin-gonic/gin"
   _ "github.com/mattn/go-sqlite3"
  "log"
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
  r.GET("/recipes", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "healthy",
    })
  })
  r.Run()
}
