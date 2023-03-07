import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CONFIG } from "@config/google_config";

const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CONFIG.client_id}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default AuthProvider;
