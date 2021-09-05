/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Logo from "../Logo.png";
import "../sidebars";
import { signout } from "../auth/helper/index";
import {
  AiFillDashboard,
  AiOutlineHistory,
  AiFillFolderAdd,
  AiFillEdit,
  AiOutlineCalendar,
} from "react-icons/ai";
const VendorNavbar = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline mt-4">
            <img src={Logo} alt="Mygrounds Logo" height="150" />
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <a href="/vendor/dashboard" className="nav-link  align-middle px-0">
              <AiFillDashboard color="#000" size="30" />
              <span className="ms-1 d-none d-sm-inline text-white ">
                Dashboard
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/admin/manage/students"
              className="nav-link  align-middle px-0"
            >
              <AiFillEdit color="#000" size="30" />

              <span className="ms-1 d-none d-sm-inline text-white ">
                Manage Turf
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a to="/vendor/add/turf" className="nav-link  align-middle px-0">
              <AiFillFolderAdd color="#000" size="30" />

              <span className="ms-1 d-none d-sm-inline text-white ">
                Add A Turf
              </span>
            </a>
          </li>

          <li className="nav-item">
            <a
              href="/admin/manage/group"
              className="nav-link  align-middle px-0"
            >
              <AiOutlineCalendar color="#000" size="30" />

              <span className="ms-1 d-none d-sm-inline text-white ">
                Manage Bookings
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/admin/manage/group"
              className="nav-link  align-middle px-0"
            >
              <AiOutlineHistory color="#000" size="30" />

              <span className="ms-1 d-none d-sm-inline text-white ">
                Bookings History
              </span>
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">vendor</span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="/vendor/profile">
                Profile
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  signout();
                  window.location = "/";
                }}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorNavbar;
