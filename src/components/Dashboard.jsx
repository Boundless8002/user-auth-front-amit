import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          setTimeout(() => {
            toast.success("Logged out successfully");
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/auth/verify").then((res) => {
      if (res.data.status) {
        axios.get("http://localhost:5000/auth/user").then((res) => {
          if (res.data.username) {
            setUsername(res.data.username);
          }
          setLoading(false);
          console.log(res);
        });
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading........</div>;
  }
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-left">
          <li>{username}</li>
        </div>
        <div className="dashboard-right">
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      <h2>{`Welcome ${username} to our dashboard`}</h2>
    </div>
  );
};

export default Dashboard;
