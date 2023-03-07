package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	User_id  string             `json:"user_id" bson:"user_id"`
	TodoList []Todo             `json:"todo_list" bson:"todo_list"`
}
