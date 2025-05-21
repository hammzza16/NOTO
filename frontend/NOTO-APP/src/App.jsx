import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import "./index.css";
import Modal from "react-modal";
import LoginRegister from "./pages/loginRegitser/loginRegister";
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
      <Route path="/signup" element={<SignUp />} />
      <Route path="/LogReg" element={<LoginRegister />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
