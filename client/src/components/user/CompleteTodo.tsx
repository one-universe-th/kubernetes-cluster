import React from "react";
import { Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { TodoStoreImpl } from "@store/TodoStore";
import { observer } from "mobx-react";

interface CompleteTotoProps {
  handleComplete: () => void;
  todo_id: string;
  color?: string;
  todoStore: TodoStoreImpl;
}

const CompleteTodo: React.FC<CompleteTotoProps> = observer((props) => {
  const { handleComplete } = props;
  return (
    <Tooltip
      title={props.color ? "uncomplete this todo" : "complete this todo"}
      placement="bottom"
    >
      <CheckOutlined
        key="completly"
        onClick={handleComplete}
        style={{ color: props.color }}
      />
    </Tooltip>
  );
});

export default CompleteTodo;
