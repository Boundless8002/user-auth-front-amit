import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handleLogout = () => {
    axios
      .get("https://user-auth-amit.onrender.com/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      Home
      <button>
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <br />
      <br />
      <button onClick={handleLogout}>Login</button>
    </div>
  );
};

export default Home;
