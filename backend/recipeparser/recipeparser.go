package recipeparser

import (
	"fmt"
	"golang.org/x/net/html"
	"io"
	"net/url"
	"strings"
)

type RecipeParser struct {
	URL      string `json:"url"`
	Hostname string
}

type RecipeData struct {
	Images []Image  `json:"images"`
	Label  []string `json:"label"`
	Href   string   `json:"href"`
}

type Image struct {
	Img string
	Alt string
}

func (r *RecipeParser) ParseHostName() (string, error) {
	parsed, err := url.Parse(r.URL)
	if err != nil {
		return "", err
	}
	r.Hostname = parsed.Hostname()
	return parsed.Hostname(), nil
}

func (r *RecipeParser) ParseData(body io.ReadCloser) (RecipeData, error) {
	tokenizer := html.NewTokenizer(body)
	var imageList []Image
	var pageTitle string
	var metaTitle string

	seen := make(map[string]bool)
	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken:
			possibleTitles := []string{pageTitle, metaTitle}
			if len(imageList) > 0 {
				return RecipeData{Images: imageList, Label: possibleTitles, Href: r.URL}, nil
			} else {
				return RecipeData{Images: nil, Label: possibleTitles, Href: r.URL}, nil
			}
		case html.StartTagToken, html.SelfClosingTagToken:
			t := tokenizer.Token()
			if t.Data == "title" {
				tt = tokenizer.Next()
				if tt == html.TextToken {
					pageTitle = strings.TrimSpace(string(tokenizer.Text()))
				}
			}
			if t.Data == "meta" && metaTitle == "" {
				var property, content string
				for _, attr := range t.Attr {
					if attr.Key == "property" && attr.Val == "og:title" {
						property = attr.Val
					}
					if attr.Key == "content" {
						content = attr.Val
					}
				}
				if property == "og:title" {
					metaTitle = strings.TrimSpace(content)
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
							return RecipeData{}, err
						}
						imageHostName := parsed.Hostname()
						if r.Hostname == imageHostName {
							if !seen[attr.Val] {
								seen[attr.Val] = true
								tmpImage.Img = attr.Val
							}
						}
						if attr.Val[0] == '/' {
							combineHostNameWithRootPath := fmt.Sprintf("https://%s%s", r.Hostname, attr.Val)
							if !seen[combineHostNameWithRootPath] {
								tmpImage.Img = combineHostNameWithRootPath
							}
						}
					}
				}
				if tmpImage.Alt == "" {
					tmpImage.Alt = ""
				}
				if tmpImage.Img != "" {
					imageList = append(imageList, Image{Img: tmpImage.Img, Alt: tmpImage.Alt})
				}
			}
		}
	}
}
