package repository

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/go-redis/redis"
	"github.com/google/uuid"
	"github.com/one-universe/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TodoRepository interface {
	GetUser(user_id string) (*models.User, error)
	CreateTodo(user_id string, todo models.Todo) (*models.Todo, error)
	UpdateTodo(user_id string, todo models.Todo) (*models.Todo, error)
	DeleteTodo(user_id, todo_id string) error
}

type todoRepository struct {
	mongo_collection *mongo.Collection
	redis_client     *redis.Client
}

func NewTodoRepository(mongo_collection *mongo.Collection, redis_client *redis.Client) TodoRepository {
	return &todoRepository{
		mongo_collection: mongo_collection,
		redis_client:     redis_client,
	}
}

func (c *todoRepository) GetUser(user_id string) (*models.User, error) {
	val, err := c.redis_client.Get(user_id).Result()

	if err == nil {
		var res *models.User
		json.Unmarshal([]byte(val), &res)
		return res, nil
	}

	var user models.User

	filter := bson.M{"user_id": user_id}
	if err = c.mongo_collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("user not found")
		}

		return nil, err
	}

	json_user, err := json.Marshal(user)
	if err != nil {
		return nil, err
	}

	c.redis_client.Set(user_id, json_user, 0)
	return &user, nil
}

func (c *todoRepository) CreateTodo(user_id string, todo models.Todo) (*models.Todo, error) {
	todo.ID = uuid.New().String()
	user, err := c.GetUser(user_id)

	if err != nil {
		return nil, err
	}

	user.TodoList = append([]models.Todo{todo}, user.TodoList...)

	filter := bson.M{"user_id": user_id}
	update := bson.M{"$set": bson.M{"todo_list": user.TodoList}}

	_, err = c.mongo_collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	c.redis_client.Del(user_id)          // delete old data
	c.redis_client.Set(user_id, user, 0) // add new data

	return &todo, nil
}

func (c *todoRepository) UpdateTodo(user_id string, todo models.Todo) (*models.Todo, error) {
	user, err := c.GetUser(user_id)

	if err != nil {
		return nil, err
	}

	for i, t := range user.TodoList {
		if t.ID == todo.ID {
			user.TodoList[i] = todo
		}
	}

	filter := bson.M{"user_id": user_id}
	update := bson.M{"$set": bson.M{"todo_list": user.TodoList}}

	if _, err = c.mongo_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return nil, err
	}

	c.redis_client.Del(user_id)          // delete old data
	c.redis_client.Set(user_id, user, 0) // add new data

	return &todo, nil
}

func (c *todoRepository) DeleteTodo(user_id, todo_id string) error {

	user, err := c.GetUser(user_id)
	old := len(user.TodoList)

	if err != nil {
		return err
	}

	for i, t := range user.TodoList {
		if t.ID == todo_id {
			user.TodoList = append(user.TodoList[:i], user.TodoList[i+1:]...)
		}
	}

	if len(user.TodoList) == old {
		return errors.New("todo not found")
	}

	filter := bson.M{"user_id": user_id}
	update := bson.M{"$set": bson.M{"todo_list": user.TodoList}}

	if _, err = c.mongo_collection.UpdateOne(context.TODO(), filter, update); err != nil {
		return err
	}

	c.redis_client.Del(user_id)

	return nil
}
