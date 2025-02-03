import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
//import Logo from "../images/logo.png";
import "../App.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // State for managing the modal visibility
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Toggle the Help Modal
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} className="navbar-logo" alt="logo" />
        </NavLink>
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/weather"
              >
                Weather
              </NavLink>
            </li>
            <li className="nav-item" style={{"padding-left":"800px"}}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to="/help"
              >
                Help
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {isHomePage && (
        <div className="home-page">
          <div className="content"></div>
        </div>
      )}
      
    </>
  );
};

export default Navbar;
