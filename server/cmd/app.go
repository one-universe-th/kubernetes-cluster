package main

import (
	"context"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/one-universe/cmd/connection"
	"github.com/one-universe/cmd/routers"
)

func main() {
	app := gin.Default()

	redis_client := connection.ConnectRedis()
	mongo_client := connection.ConnectMongo()

	defer func() {
		mongo_client.Disconnect(context.TODO())
		redis_client.Close()
	}()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	app.Use(cors.New(config))

	collection := mongo_client.Database("todolist").Collection("user")

	router := routers.NewRouter(collection, redis_client)
	api := app.Group("/api")
	{
		router.UserRouter(api)
		router.TodoRouter(api)
	}

	app.Run(":8080")
}
