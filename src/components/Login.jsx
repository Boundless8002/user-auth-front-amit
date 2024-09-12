import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "https://user-auth-amit.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      toast.success("Login successfully");
      navigate("/");
    } catch (err) {
      // if (err.response) {
      //   console.log("Server responded with error:", err.response.data);
      // } else if (err.request) {
      //   console.log("No response from server:", err.request);
      // } else {
      //   console.log("Error setting up request:", err.message);
      // }
      toast.error("Server error");
    }
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*******"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div className="forget">
          <Link to="/forgot-password" className="centerLink">
            Forgot Password ?
          </Link>
        </div>

        <p>
          Don't Have an account ? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
