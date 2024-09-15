import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Homeicon from "../assets/images/auth-icon.jpg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("https://user-auth-amit.onrender.com/auth/user/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="header-section">
        <div className="header-left">
          <img src={Homeicon} alt="Home Icon" />
        </div>
        <div className="header-right">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/login">
                  <button onClick={handleLogout} className="dashboard-login">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
