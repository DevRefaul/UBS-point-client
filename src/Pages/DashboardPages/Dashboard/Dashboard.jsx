import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../../Components/Shared/Footer/Footer";
import Header from "../../../Components/Shared/Header/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr,4fr]">
        <div className="h-screen bg-green-100">
          <ul className="menu p-4 w-full font-bold text-lg text-black">
            <li>
              <NavLink
                to="/dashboard/profile"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/mybookings"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addproduct"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                Add Bike
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageproduct"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/verifyseller"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                Apply Verify
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allbuyers"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allsellers"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                All Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reportedproducts"
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "",
                  background: isActive ? "#21C473" : "",
                })}
              >
                Reported Products
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="h-screen bg-orange-100">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
