package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-universe/pkg/models"
)

type TodoPresenter interface {
	TodoSuccessResponse(todo *models.Todo) gin.H
	TodoDeleteSuccessResponse() gin.H
	TodoErrorResponse(err error) gin.H
}

type todoPresenter struct {
}

type TodoResponse struct {
	Title       string `json:"title" bson:"title"`
	Description string `json:"description" bson:"description"`
	TagName     string `json:"tag_name" bson:"tag_name"`
	TagColor    string `json:"tag_color" bson:"color_tag"`
	Date        string `json:"date" bson:"date"`
	Favorite    bool   `json:"favorite" bson:"favorite"`
	Completed   bool   `json:"completed" bson:"completed"`
}

func NewTodoPresenter() TodoPresenter {
	return &todoPresenter{}
}

func (p *todoPresenter) TodoSuccessResponse(todo *models.Todo) gin.H {
	return gin.H{
		"data": TodoResponse{
			Title:       todo.Title,
			Description: todo.Description,
			TagName:     todo.TagName,
			TagColor:    todo.TagColor,
			Date:        todo.Date,
			Favorite:    todo.Favorite,
			Completed:   todo.Completed,
		},
		"error": nil,
	}
}

func (p *todoPresenter) TodoDeleteSuccessResponse() gin.H {
	return gin.H{
		"data":  nil,
		"error": nil,
	}
}

func (p *todoPresenter) TodoErrorResponse(err error) gin.H {
	return gin.H{
		"data":  nil,
		"error": err.Error(),
	}
}
