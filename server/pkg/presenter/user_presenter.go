package presenter

import (
	"github.com/gin-gonic/gin"
	"github.com/one-universe/pkg/models"
)

type UserPresenter interface {
	UserErrorResponse(err error) gin.H
	UserResponse(user *models.User) gin.H
}

type userPresenter struct {
}

type UserResponse struct {
	User_id  string        `json:"user_id" bson:"user_id"`
	TodoList []models.Todo `json:"todo_list" bson:"todo_list"`
}

func NewUserPresenter() UserPresenter {
	return &userPresenter{}
}

func (p *userPresenter) UserErrorResponse(err error) gin.H {
	return gin.H{
		"data":  nil,
		"error": err.Error(),
	}
}

func (p *userPresenter) UserResponse(user *models.User) gin.H {
	return gin.H{
		"data": &UserResponse{
			User_id:  user.User_id,
			TodoList: user.TodoList,
		},
		"error": nil,
	}
}
