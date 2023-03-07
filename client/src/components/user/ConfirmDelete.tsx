import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React from "react";

interface ConfirmDeleteProps {
  open: boolean;
  onOk: () => void;
  onCancel?: () => void;
  handleClick: () => void;
}
const ConfirmDelete: React.FC<ConfirmDeleteProps> = (props) => {
  const { open, onOk, onCancel, handleClick } = props;

  return (
    <Popconfirm
      title="Delete"
      description="Are you sure to delete this todo?"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      open={open}
      onConfirm={onOk}
      onCancel={onCancel}
      okText="Yes"
    >
      <SettingOutlined key="setting" onClick={handleClick} />
    </Popconfirm>
  );
};

export default ConfirmDelete;
