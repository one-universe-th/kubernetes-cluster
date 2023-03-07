import React from "react";
import styled from "styled-components";
import LOGO from "@assets/logo.svg";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useGoogleProfile } from "@hooks/useGoogleProfile";
import { useCookies } from "react-cookie";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const { profile } = useGoogleProfile();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie("google_token", { path: "/", domain: "localhost" });
    navigate("/");
  };

  const AVATAR_ITEMS: MenuProps["items"] = [
    {
      key: "1",
      label: <h4 onClick={handleLogout}>logout</h4>,
      style: {
        fontSize: "1rem",
        padding: "0.75rem 1rem",
        minWidth: "10rem",
        color: "rgba(0,0,0,0.7)",
        fontWeight: 400,
      },
      icon: <LogoutOutlined style={{ fontSize: 25 }} />,
    },
  ];
  return (
    <Nav>
      <FlexChild>
        <img src={LOGO} draggable="false" alt="one universe logo" />
      </FlexChild>
      <FlexChild>
        <Dropdown menu={{ items: AVATAR_ITEMS }}>
          <AvatarCustom src={profile?.picture} size={"large"} alt="avatar" />
        </Dropdown>
      </FlexChild>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin-bottom: 3rem;
  background-color: white;
`;

const FlexChild = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Heading = styled.h4`
  margin: 0;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
  transition: all 0.25s ease-in-out;
`;

const AvatarCustom = styled(Avatar)`
  cursor: pointer;
`;
