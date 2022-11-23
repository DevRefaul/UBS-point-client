import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

/* 
to="/"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "",
            background: isActive ? "#21C473" : "",
          })}
*/

const Header = () => {
  const menuItems = ["home", "prodcuts", "dashboard"];

  return (
    <div className=" bg-slate-100 sticky top-0 py-1">
      <div className="navbar w-[90%] md:w-[80%] mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((menuItem, idx) => (
                <li key={idx}>
                  <NavLink
                    className="rounded capitalize"
                    to={`/${menuItem}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#21C473" : "",
                    })}
                  >
                    {menuItem}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <NavLink className="">
            <img src={logo} alt="" className="max-w-[9rem] md:max-w-1/2" />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 font-semibold">
            {menuItems.map((menuItem, idx) => (
              <li key={idx} className="mx-2">
                <NavLink
                  className="rounded capitalize"
                  to={`/${menuItem}`}
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "",
                    background: isActive ? "#21C473" : "",
                  })}
                >
                  {menuItem}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end hidden md:flex">
          <Link
            to="/login"
            className="btn bg-[#21C473] text-white font-bold border-2 border-transparent hover:text-[#21C473] hover:bg-transparent hover:border-2 hover:border-[#21C473]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
