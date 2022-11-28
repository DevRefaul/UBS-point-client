import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import Footer from "../../../Components/Shared/Footer/Footer";
import Header from "../../../Components/Shared/Header/Header";
import { Authentication } from "../../../Contexts/Auth/AuthContext";
import Error from "../../Error/Error";

const Dashboard = () => {
  const { user } = useContext(Authentication);


  const userEmail = user?.email;

  // passing email to server

  const { data, isLoading, error } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/user?email=${userEmail}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const userInfo = data;
  const { role } = userInfo?.result;


  const admin = role === "admin";
  const seller = role === "seller";
  const buyer = role === "buyer";

  return (
    <>
      <Header />
      <div className="">
        {/* dashboard navigations for small screen */}

        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-white border border-green-400 my-2 px-3 text-black  mx-6 drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Menu
            </label>
            {/* contents of dashboard */}
            {/* for mobile */}
            <div className="lg:hidden overflow-scroll h-screen bg-green-100">
              <Outlet />
            </div>
            {/* for destop */}
            <div className="hidden overflow-scroll lg:block h-screen bg-green-100">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-[80%] md:w-[30%] lg:w-full  bg-base-100 text-base-content">
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

              {/* conditional rendering for buyer start */}
              {buyer && (
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
              )}
              {/* conditional rendering for buyer end */}

              {/* conditional rendering for seller start */}
              {seller && (
                <>
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
                      to="/dashboard/soldbikes"
                      style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#21C473" : "",
                      })}
                    >
                      Sold Bikes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/verifyrequest"
                      style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#21C473" : "",
                      })}
                    >
                      Apply Verify
                    </NavLink>
                  </li>
                </>
              )}
              {/* conditional rendering for slller end */}

              {/* conditional rendering for admin start */}
              {admin && (
                <>
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
                      to="/dashboard/verifyseller"
                      style={({ isActive }) => ({
                        color: isActive ? "#fff" : "",
                        background: isActive ? "#21C473" : "",
                      })}
                    >
                      Verify Sellers
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
                </>
              )}
              {/* conditional rendering for admin end */}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

// {
//   /* <div className="h-screen bg-green-100 hidden lg:block">
//   <ul className="menu p-4 w-full font-bold text-lg text-black">
//     <li>
//       <NavLink
//         to="/dashboard/profile"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         Profile
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/mybookings"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         My Bookings
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/addproduct"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         Add Bike
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/manageproduct"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         Manage Products
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/verifyseller"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         Apply Verify
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/allbuyers"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         All Users
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/allsellers"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         All Sellers
//       </NavLink>
//     </li>
//     <li>
//       <NavLink
//         to="/dashboard/reportedproducts"
//         style={({ isActive }) => ({
//           color: isActive ? "#fff" : "",
//           background: isActive ? "#21C473" : "",
//         })}
//       >
//         Reported Products
//       </NavLink>
//     </li>
//   </ul>
// </div> */
// }

/* 
                // { dashboard navigations for big screen }
        <div className="h-screen bg-green-100 hidden lg:block">
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

        // {contents of dashboard }
         <div className="hidden lg:block h-screen bg-orange-100">
          <Outlet />
        </div> 

        */
