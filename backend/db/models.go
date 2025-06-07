package db

import (
	"database/sql"
	"encoding/json"
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
