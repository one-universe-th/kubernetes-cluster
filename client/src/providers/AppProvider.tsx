import React from "react";
import AuthProvider from "./AuthProvider";

const AppProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
