import React, { useState } from "react";
import { Card, Tag } from "antd";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import ModalForm from "./ModalForm";
import ConfirmDelete from "./ConfirmDelete";
import FavoriteTodo from "./FavoriteTodo";
import CompleteTodo from "./CompleteTodo";
import { useFavorite } from "@hooks/useFavorite";
import { TodoForm } from "@interfaces/TodoForm";
import { useUpdateTodo } from "@hooks/useUpdateTodo";
import { useDeleteTodo } from "@hooks/useDeleteTodo";
import { MAP_TAG_COLOR } from "src/mocks/map_tag_color";
import { useCompleteTodo } from "@hooks/useCompleteTodo";
import { TodoStoreImpl } from "@store/TodoStore";
import { observer } from "mobx-react";
interface CardListProps {
  id: string;
  title: string;
  description: string;
  tag_name: string;
  tag_color: string;
  date: string;
  favorite: boolean;
  completed: boolean;
  todoStore: TodoStoreImpl;
}

const CardList: React.FC<CardListProps> = observer((props) => {
  const {
    id,
    title,
    description,
    tag_name,
    tag_color,
    date,
    favorite,
    completed,
    todoStore,
  } = props;

  const [todoSetting, setTodoSetting] = useState({
    id,
    title,
    description,
    tag_name,
    tag_color,
    date,
    favorite,
    completed,
  });
  const [favoriteTodo, setFavoriteTodo] = useState<boolean>(favorite);
  const [updateTodo, setUpdateTodo] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleFavorite = () => {
    setFavoriteTodo(!favoriteTodo);
    useFavorite({
      ...todoSetting,
      favorite: !favoriteTodo,
    });
    todoStore.UpdateTodo(id, {
      ...todoSetting,
      favorite: !favoriteTodo,
    });
  };

  const handleUpdate = (form: TodoForm) => {
    setUpdateTodo(false);
    useUpdateTodo({
      ...todoSetting,
      ...form,
    });
    todoStore.UpdateTodo(id, form);
  };

  const handleDelete = () => {
    setConfirmDelete(false);
    useDeleteTodo(id);
    todoStore.DeleteTodo(id);
  };

  const handleComplete = () => {
    useCompleteTodo({
      ...todoSetting,
      completed: !completed,
    });
    todoStore.UpdateTodo(id, {
      ...todoSetting,
      completed: !completed,
    });
  };

  return (
    <>
      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={
          <Img
            src={`https://singlecolorimage.com/get/${
              MAP_TAG_COLOR[tag_color as keyof typeof MAP_TAG_COLOR]
            }/100x100`}
            alt="color tab"
            width={100}
            height={100}
          />
        }
        actions={[
          <FavoriteTodo
            favorite={favoriteTodo}
            handleFavorite={handleFavorite}
          />,
          completed ? (
            <CompleteTodo
              handleComplete={handleComplete}
              color="#32CD32"
              todoStore={todoStore}
              todo_id={id}
            />
          ) : (
            <CompleteTodo
              handleComplete={handleComplete}
              todoStore={todoStore}
              todo_id={id}
            />
          ),
          <EditOutlined key="edit" onClick={() => setUpdateTodo(true)} />,
          <ConfirmDelete
            open={confirmDelete}
            onOk={handleDelete}
            onCancel={() => setConfirmDelete(false)}
            handleClick={() => setConfirmDelete(true)}
          />,
        ]}
      >
        <Heading>{title}</Heading>
        <Description>
          <div>
            <Tag color={tag_color}>{tag_name}</Tag>
            {date ? <Tag color="default">{date}</Tag> : ""}
          </div>
          <div>{description}</div>
        </Description>
      </Card>
      <ModalForm
        open={updateTodo}
        onOk={handleUpdate}
        title={title}
        description={description}
        tag_name={tag_name}
        tag_color={tag_color}
        date={date}
        onCancel={() => setUpdateTodo(false)}
      />
    </>
  );
});

export default CardList;

const Img = styled.img`
  height: 0.4rem;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  > div {
    color: rgba(0, 0, 0, 0.5);
    word-wrap: break-word;
  }
`;

const Heading = styled.h2`
  font-weight: 400;
  word-wrap: break-word;
`;
