import React from "react";
import { isAdmin, isAuthenticated, isVendor, signout } from "../auth/helper";
const currentTab = (history, path) => {
  document.body.style.background = "#ffffff";

  if (history.location.pathname === path) {
    return { color: "#8E2DE2" };
  } else {
    return { color: "#000000" };
  }
};
const Navbar = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-text bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            MyGrounds
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {!isAuthenticated() && (
                <li className="nav-item">
                  <a className="nav-link" href="/register/vendor/">
                    Register As Business
                  </a>
                </li>
              )}
              {!isAuthenticated() && (
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Register as Customer
                  </a>
                </li>
              )}
              {!isAuthenticated() && (
                <li className="nav-item">
                  <a className="nav-link" href="/signin">
                    Login
                  </a>
                </li>
              )}
              {isVendor() && (
                <li className="nav-item">
                  <a className="nav-link" href="/vendor/dashboard">
                    Dashboard
                  </a>
                </li>
              )}
              {isAdmin() && (
                <li className="nav-item">
                  <a className="nav-link" href="/admin/dashboard">
                    Dashboard
                  </a>
                </li>
              )}
              {isAuthenticated() && (
                <li className="nav-item ">
                  <span
                    className="nav-link text-warning"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
