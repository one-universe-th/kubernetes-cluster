package routers

import (
	"github.com/go-redis/redis"
	"go.mongodb.org/mongo-driver/mongo"
)

type router struct {
	mongo_collection *mongo.Collection
	redis_client     *redis.Client
}

func NewRouter(mongo_client *mongo.Collection, redis_client *redis.Client) *router {
	return &router{
		mongo_collection: mongo_client,
		redis_client:     redis_client,
	}
}
