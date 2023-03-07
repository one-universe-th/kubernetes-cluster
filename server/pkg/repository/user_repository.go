package repository

import (
	"context"
	"encoding/json"

	"github.com/go-redis/redis"
	"github.com/one-universe/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	GetUser(ID string) (*models.User, error)
}

type userRepository struct {
	mongo_collection *mongo.Collection
	redis_client     *redis.Client
}

func NewUserRepository(mongo_collection *mongo.Collection, redis_client *redis.Client) UserRepository {
	return &userRepository{
		mongo_collection: mongo_collection,
		redis_client:     redis_client,
	}
}

func (c *userRepository) GetUser(ID string) (*models.User, error) {
	val, err := c.redis_client.Get(ID).Result()

	if err == nil {
		var res *models.User
		json.Unmarshal([]byte(val), &res)
		return res, nil
	}

	var user models.User

	filter := bson.M{"user_id": ID}
	err = c.mongo_collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			if _, err := c.mongo_collection.InsertOne(context.TODO(), map[string]interface{}{
				"user_id":   ID,
				"todo_list": []models.Todo{},
			}); err != nil {
				return nil, err
			}

			user.User_id = ID
		} else {
			return nil, err
		}
	}

	json_user, err := json.Marshal(user)
	if err != nil {
		return nil, err
	}

	c.redis_client.Set(ID, json_user, 0)

	return &user, nil
}
