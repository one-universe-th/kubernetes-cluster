import React, { useEffect } from "react";
import { useGoogleProfile } from "@hooks/useGoogleProfile";
import styled from "styled-components";
import CardList from "@components/user/CardList";
import Header from "@components/user/Header";
import { useTodoList } from "@hooks/useTodoList";
import { TodoStoreImpl } from "@store/TodoStore";
import { observer } from "mobx-react";

interface UserProps {
  todoStore: TodoStoreImpl;
}

const User: React.FC<UserProps> = observer((props) => {
  const { todoStore } = props;
  const { profile } = useGoogleProfile();
  const { todoList } = useTodoList();

  useEffect(() => {
    if (todoList) {
      todoStore.todoList = todoList;
      todoStore.allTodo = todoList;
    }
  }, [todoList]);

  return (
    <Container>
      <Header name={profile?.name} todoStore={todoStore} />
      <Flex>
        {todoStore.todoList?.map((item) => {
          return <CardList key={item.id} {...item} todoStore={todoStore} />;
        })}
      </Flex>
    </Container>
  );
});

export default User;

const Container = styled.div`
  padding: 0 3rem 3rem 3rem;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  > * {
    align-self: flex-start;
  }
`;
