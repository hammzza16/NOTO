import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./index.css";
import Modal from "react-modal";
import LoginRegister from "./pages/loginRegister/LoginRegister";
Modal.setAppElement("#root");
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Navigate,
} from "react-router-dom";
const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/LogReg" replace />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/LogReg" element={<LoginRegister />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
