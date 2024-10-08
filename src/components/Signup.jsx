import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const navigate = useNavigate();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token); // Set reCAPTCHA token
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }
    Axios.post("https://user-auth-amit.onrender.com/signup", {
      username,
      email,
      password,
      recaptchaToken,
    })
      .then((response) => {
        console.log(response);
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to register user. Please try again later.");
      });
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        {/* Google reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6Lcpgj8qAAAAALsSFpr5P78cqe5vn-RJyD2yvMnQ" // Replace with your site key
          onChange={handleRecaptcha}
        />
        <button type="submit">Sign Up</button>
        <p>
          Have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
