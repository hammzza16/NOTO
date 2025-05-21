import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  let navigate = useNavigate();
  let handleSignUp = async (e) => {
    //SignUp API CALL
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!Name) {
      setError("Please enter your Name");
      return;
    }

    if (!password) {
      setError("Please enter Password");
      return;
    }

    setError("");
    try {
      let response = await axiosInstance.post("/create-account", {
        fullname: Name, //right side values are the ones that we are passing from the front end and left side are the value name in the backend
        password,
        email,
      });
      console.log(response);

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

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

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-18">
        <div className="w-96 border-2 border-gray-300 rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl mb-7">Register</h4>
            <input
              type="Name"
              placeholder="Name"
              className="input-box"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
