import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Navigation from "./Navigation";

const Layout: React.FC = () => {
  return (
    <Box>
      <Navigation />
      <Outlet />
    </Box>
  );
};

export default Layout;

const Box = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-color: #ffffff;
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
`;
