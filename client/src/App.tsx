import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "@pages/Auth";
import User from "@pages/User";
import Layout from "./shared/Layout";
import { TodoStore } from "@store/TodoStore";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/me" element={<Layout />}>
        <Route path="/me" element={<User todoStore={TodoStore} />} />
      </Route>
    </Routes>
  );
};

export default App;
