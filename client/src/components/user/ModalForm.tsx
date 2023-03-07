import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Modal, Input, DatePicker, Select, DatePickerProps } from "antd";
import type { TodoForm } from "@interfaces/TodoForm";
import { TAG_COLOR } from "src/mocks/tag_color";

const { TextArea } = Input;

interface ModalFormProps {
  open: boolean;
  onOk: (form: TodoForm) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  date?: string;
  tag_name?: string;
  tag_color?: string;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
  const {
    open,
    onOk,
    onCancel,
    title,
    description,
    date,
    tag_name,
    tag_color,
  } = props;
  const [todoForm, setTodoForm] = useState({
    title: title || "",
    description: description || "",
    date: date || dayjs().format("YYYY/MM/DD"),
    tag_name: tag_name || "work",
    tag_color: tag_color || "cyan",
  });

  const [titleError, setTitleError] = useState<boolean>(false);

  const handleOk = () => {
    if (!todoForm.title) {
      return setTitleError(true);
    }

    onOk({ ...todoForm, favorite: false, completed: false });
    setTodoForm({
      title: title || "",
      description: description || "",
      date: date || dayjs().format("YYYY/MM/DD"),
      tag_name: tag_name || "work",
      tag_color: tag_color || "cyan",
    });
  };

  const handleChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setTodoForm({ ...todoForm, date: dateString });
  };

  return (
    <>
      <Modal
        title="Create Todo List"
        okText="submit"
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <InputCustom
          placeholder="Title"
          required
          status={titleError ? "error" : ""}
          onChange={(e) => setTodoForm({ ...todoForm, title: e.target.value })}
          value={todoForm.title}
        />
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
          style={{ marginBottom: "1rem" }}
          onChange={(e) =>
            setTodoForm({ ...todoForm, description: e.target.value })
          }
          value={todoForm.description}
        />
        <Inline>
          <DatePicker
            picker="date"
            onChange={handleChangeDate}
            defaultValue={dayjs(todoForm.date)}
          />
          <Input
            placeholder="Tag name"
            onChange={(e) =>
              setTodoForm({ ...todoForm, tag_name: e.target.value })
            }
            style={{ width: 120 }}
            value={todoForm.tag_name}
          />
          <Select
            placeholder="Tag Color"
            style={{ width: 120 }}
            options={TAG_COLOR}
            onChange={(value) => setTodoForm({ ...todoForm, tag_color: value })}
            value={todoForm.tag_color}
          />
        </Inline>
      </Modal>
    </>
  );
};

export default ModalForm;

const InputCustom = styled(Input)`
  margin-bottom: 1rem;
`;

const Inline = styled.div`
  display: flex;
  gap: 1rem;
`;
