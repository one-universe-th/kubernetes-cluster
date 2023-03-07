package models

type Todo struct {
	ID          string `json:"id" bson:"id"`
	Title       string `json:"title" bson:"title"`
	Description string `json:"description" bson:"description"`
	TagName     string `json:"tag_name" bson:"tag_name"`
	TagColor    string `json:"tag_color" bson:"tag_color"`
	Date        string `json:"date" bson:"date"`
	Favorite    bool   `json:"favorite" bson:"favorite"`
	Completed   bool   `json:"completed" bson:"completed"`
}
