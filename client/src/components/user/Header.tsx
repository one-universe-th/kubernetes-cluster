import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import ModalForm from "./ModalForm";
import { ScreenSize } from "src/mocks/ScreenSize";
import { TodoForm } from "@interfaces/TodoForm";
import { useAddTodo } from "@hooks/useAddTodo";
import type { MenuProps } from "antd";
import {
  CheckCircleOutlined,
  HeartOutlined,
  OrderedListOutlined,
  FilterOutlined,
  FolderAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { TodoStoreImpl } from "@store/TodoStore";
import { observer } from "mobx-react";

interface HeaderProps {
  name?: string;
  todoStore: TodoStoreImpl;
}

const DEFAULT_STYLE = {
  fontSize: "1rem",
  padding: "0.75rem 1rem",
  minWidth: "10rem",
  color: "rgba(0,0,0,0.7)",
  fontWeight: 400,
};

const Header: React.FC<HeaderProps> = observer((props) => {
  const { name, todoStore } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const FILTER_ITEMS: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => todoStore.FilterTodo("all")}>all todo</div>,
      style: DEFAULT_STYLE,
      icon: <OrderedListOutlined style={{ fontSize: 25 }} />,
    },
    {
      key: "2",
      label: (
        <div onClick={() => todoStore.FilterTodo("favorite")}>
          favorite todo
        </div>
      ),
      style: DEFAULT_STYLE,
      icon: <HeartOutlined style={{ fontSize: 25 }} />,
    },
    {
      key: "3",
      label: (
        <div onClick={() => todoStore.FilterTodo("completed")}>
          Completed todolist
        </div>
      ),
      style: DEFAULT_STYLE,
      icon: <CheckCircleOutlined style={{ fontSize: 25 }} />,
    },
    {
      key: "4",
      label: (
        <div onClick={() => todoStore.FilterTodo("uncompleted")}>
          Uncompleted todolist
        </div>
      ),
      style: DEFAULT_STYLE,
      icon: <FormOutlined style={{ fontSize: 25 }} />,
    },
  ];

  const handleSubmit = (form: TodoForm) => {
    setOpenModal(false);
    useAddTodo({
      ...form,
      favorite: false,
      completed: false,
    });

    console.log({
      ...form,
      favorite: false,
      completed: false,
    });

    todoStore.AddTodo({
      ...form,
      favorite: false,
      completed: false,
    });
  };

  return (
    <Flex>
      <WelcomeHeading>
        Welcome back
        <SpanName>{name}</SpanName>
      </WelcomeHeading>
      <div>
        <BtnCustom onClick={() => setOpenModal(true)}>
          <FolderAddOutlined style={{ fontSize: 20 }} />
          Add Todo
        </BtnCustom>
        <Dropdown menu={{ items: FILTER_ITEMS }}>
          <BtnCustom>
            <FilterOutlined style={{ fontSize: 20 }} />
            Filter
          </BtnCustom>
        </Dropdown>
      </div>
      <ModalForm
        open={openModal}
        onOk={handleSubmit}
        onCancel={() => setOpenModal(false)}
      />
    </Flex>
  );
});

export default Header;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${ScreenSize.TABLET}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WelcomeHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;

  @media only screen and (max-width: ${ScreenSize.TABLET}) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: ${ScreenSize.MOBILE}) {
    font-size: 1rem;
  }
`;

const SpanName = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: underline;

  @media only screen and (max-width: ${ScreenSize.TABLET}) {
    font-size: 1rem;
  }

  @media only screen and (max-width: ${ScreenSize.MOBILE}) {
    font-size: 0.5rem;
  }
`;

const BtnCustom = styled(Button)`
  border-color: black;
  margin: 0 1rem;
  > * {
    display: flex;
  }
`;
