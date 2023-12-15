import React from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "../images/icons/icon.png";

const Navbar = () => {
  let location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={icon} alt="icon" width="30" height="30" className="mx-2" />
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                  Home
                </Link>
              </li>

              <li className="classname">
                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
                  About
                </Link>
              </li>

              <li className="classname">
                <Link to="/note" className={`nav-link ${location.pathname === "/note" ? "active" : ""}`}>
                  Note
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <Link to="/login" className="btn btn-primary mx-1" role="button">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary mx-1" role="button">
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
