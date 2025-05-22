import React from "react";
import ReactDOM from "react-dom";
import * as Components from "./components";
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // adjust path as needed
import { validateEmail } from "../../utils/helper"; // reuse your existing helper

let LoginRegister = () => {
  const [signIn, toggle] = React.useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  let handleLogin = async (e) => {
    //LOGIN API CALL
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    //login API
    try {
      let response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again later");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(signupEmail)) {
      setSignupError("Please enter a valid email address");
      return;
    }

    if (!name) {
      setSignupError("Please enter your name");
      return;
    }

    if (!signupPassword) {
      setSignupError("Please enter password");
      return;
    }

    setSignupError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullname: name,
        email: signupEmail,
        password: signupPassword,
      });

      if (response.data?.error) {
        setSignupError(response.data.message);
        return;
      }

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      setSignupError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="bgimage">
      <Components.Container className="">
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            {signupError && (
              <p
                style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
              >
                {signupError}
              </p>
            )}
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p
                style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
              >
                {error}
              </p>
            )}
            <Components.Button type="submit">Log In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                Login to your account account
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your details and start noting today!
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default LoginRegister;
