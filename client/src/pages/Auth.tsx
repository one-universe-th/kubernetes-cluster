import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppProvider from "@providers/AppProvider";
import LOGO from "@assets/logo.svg";
import { ScreenSize } from "src/mocks/ScreenSize";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  return (
    <AppProvider>
      <Center>
        <Box>
          <Img draggable="false" src={LOGO} />
          <p>
            Make your life easier by managing your tasks with &nbsp;
            <Strong>One Universe</Strong>
          </p>
          <Heading>Continue with Google</Heading>
        </Box>
        <GoogleLogin
          onSuccess={(response: CredentialResponse) => {
            cookies.set("google_token", response.credential, { path: "/" });
            navigate("/me");
          }}
          onError={() => {
            console.log("aLogin Failed");
          }}
          useOneTap
          text="continue_with"
          state_cookie_domain="localhost"
          width="300px"
        />
      </Center>
    </AppProvider>
  );
};

export default Auth;

const Center = styled.div`
  padding-top: 20vh;
  display: flex;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  background-color: #ffffff;
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    font-weight: 200;
    text-align: center;
    padding: 1rem 0;
  }
`;

const Strong = styled.strong`
  font-weight: 400;
  color: #4285f4;
  text-decoration: underline;
`;

const Heading = styled.h4`
  font-weight: 400;
  color: #4285f4;
  padding: 0.5rem 0;
`;

const Img = styled.img`
  width: 400px;
  @media only screen and (min-width: ${ScreenSize.MOBILE}) {
    width: 300px;
  }
`;
