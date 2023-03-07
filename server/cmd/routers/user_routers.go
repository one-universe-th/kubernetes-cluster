package routers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/one-universe/pkg/presenter"
	"github.com/one-universe/pkg/repository"
)

func (r *router) UserRouter(api *gin.RouterGroup) {
	repository := repository.NewUserRepository(r.mongo_collection, r.redis_client)
	presenter := presenter.NewUserPresenter()

	api.GET("/user/:id", func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.JSON(http.StatusBadRequest, presenter.UserErrorResponse(errors.New("id is required")))
			return
		}

		user, err := repository.GetUser(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, presenter.UserErrorResponse(err))
			return
		}

		c.JSON(200, presenter.UserResponse(user))
	})

}
