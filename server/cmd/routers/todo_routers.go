package routers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-universe/pkg/models"
	"github.com/one-universe/pkg/presenter"
	"github.com/one-universe/pkg/repository"
)

func (r *router) TodoRouter(api *gin.RouterGroup) {
	repository := repository.NewTodoRepository(r.mongo_collection, r.redis_client)
	presenter := presenter.NewTodoPresenter()

	api.POST("/todo/:user_id", func(ctx *gin.Context) {
		user_id := ctx.Param("user_id")
		if user_id == "" {
			ctx.JSON(http.StatusBadRequest, presenter.TodoErrorResponse(errors.New("params is required")))
			return
		}

		todo := models.Todo{}
		err := ctx.BindJSON(&todo)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, presenter.TodoErrorResponse(err))
			return
		}

		if _, err := repository.CreateTodo(user_id, todo); err != nil {
			ctx.JSON(http.StatusInternalServerError, presenter.TodoErrorResponse(err))
			return
		}

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, presenter.TodoErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, presenter.TodoSuccessResponse(&todo))
	})

	api.PUT("/todo/:user_id", func(ctx *gin.Context) {
		user_id := ctx.Param("user_id")

		if user_id == "" {
			ctx.JSON(http.StatusBadRequest, presenter.TodoErrorResponse(errors.New("params is required")))
			return
		}

		todo := models.Todo{}
		if err := ctx.BindJSON(&todo); err != nil {
			ctx.JSON(http.StatusBadRequest, presenter.TodoErrorResponse(err))
			return
		}

		if _, err := repository.UpdateTodo(user_id, todo); err != nil {
			ctx.JSON(http.StatusInternalServerError, presenter.TodoErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, presenter.TodoSuccessResponse(&todo))
	})

	api.DELETE("/todo/:user_id/:todo_id", func(ctx *gin.Context) {
		user_id := ctx.Param("user_id")
		todo_id := ctx.Param("todo_id")

		if (user_id == "") || (todo_id == "") {
			ctx.JSON(http.StatusBadRequest, presenter.TodoErrorResponse(errors.New("params is required")))
			return
		}

		if err := repository.DeleteTodo(user_id, todo_id); err != nil {
			ctx.JSON(http.StatusInternalServerError, presenter.TodoErrorResponse(err))
			return
		}

		ctx.JSON(http.StatusOK, presenter.TodoDeleteSuccessResponse())
	})
}
