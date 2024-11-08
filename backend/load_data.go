package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"fmt"
	"io/ioutil"
	_ "github.com/mattn/go-sqlite3"
)

type Recipe struct {
	Category  string `json:"category"`
	Label     string `json:"label"`
	Alt       string `json:"alt"`
	Img       string `json:"img"`
	Href      string `json:"href"`
	IsPinned  bool   `json:"is_pinned"`
}

func loadData(db *sql.DB) error {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS recipes (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			img TEXT NOT NULL,
			href TEXT NOT NULL,
			label TEXT NOT NULL,
			alt TEXT NOT NULL,
			category_id INTEGER,
			is_pinned BOOLEAN,
			FOREIGN KEY (category_id) REFERENCES categories(id)
		);
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			category TEXT NOT NULL
		);

		INSERT INTO categories (category) VALUES ('ENTREE');
		INSERT INTO categories (category) VALUES ('LUNCH');
		INSERT INTO categories (category) VALUES ('SALAD');
		INSERT INTO categories (category) VALUES ('SOUP');
		INSERT INTO categories (category) VALUES ('BREAKFAST');
	`)
	if err != nil {
		log.Fatal(err)
	}

	data, err := ioutil.ReadFile("recipes.json")
	if err != nil {
		log.Fatal(err)
	}

	var recipes []Recipe
	err = json.Unmarshal(data, &recipes)
	if err != nil {
		log.Fatal(err)
	}

	for _, recipe := range recipes {
		var categoryID int
		err = db.QueryRow("SELECT id FROM categories WHERE category = ?", recipe.Category).Scan(&categoryID)
		if err != nil {
			if err != sql.ErrNoRows {
				log.Fatal(err)
			}
			log.Printf("Category '%s' not found for recipe '%s'. Skipping...\n", recipe.Category, recipe.Label)
			continue
		}

		_, err = db.Exec(`
			INSERT INTO recipes (img, href, label, alt, category_id, is_pinned)
			VALUES (?, ?, ?, ?, ?, ?)
		`, recipe.Img, recipe.Href, recipe.Label, recipe.Alt, categoryID, recipe.IsPinned)
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Recipes have been successfully inserted into the database.")
	return nil
}
