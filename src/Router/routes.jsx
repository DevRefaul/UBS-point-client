import SingleBikeFullInfo from "../Components/SingleBikeFullInfo/SingleBikeFullInfo";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import AddProduct from "../Pages/DashboardPages/AddProduct/AddProduct";
import AllSellers from "../Pages/DashboardPages/AllSellers/AllSellers";
import AllUsers from "../Pages/DashboardPages/AllUsers/AllUsers";
import Dashboard from "../Pages/DashboardPages/Dashboard/Dashboard";
import ManageProduct from "../Pages/DashboardPages/ManageProduct/ManageProduct";
import MyBookings from "../Pages/DashboardPages/MyBookings/MyBookings";
import Profile from "../Pages/DashboardPages/Profile/Profile";
import ReportedProducts from "../Pages/DashboardPages/ReportedProducts/ReportedProducts";
import VerifySeller from "../Pages/DashboardPages/VerifySeller/VerifySeller";
import Error from "../Pages/Error/Error";
import BMW from "../Pages/Home/BMW/BMW";
import Home from "../Pages/Home/Home";
import Honda from "../Pages/Honda/Honda";
import Login from "../Pages/Login/Login";
import MVAgusta from "../Pages/MVAgusta/MVAgusta";
import Register from "../Pages/Register/Register";
import Yamaha from "../Pages/Yamaha/Yamaha";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Root from "../Root/Root";

const { createBrowserRouter } = require("react-router-dom");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/honda",
        element: <Honda />,
      },
      {
        path: "/honda/:id",
        element: (
          <PrivateRoute>
            <SingleBikeFullInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/bmw",
        element: <BMW />,
      },
      {
        path: "/bmw/:id",
        element: (
          <PrivateRoute>
            <SingleBikeFullInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/mvagusta",
        element: <MVAgusta />,
      },
      {
        path: "/mv/:id",
        element: (
          <PrivateRoute>
            <SingleBikeFullInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/yamaha",
        element: <Yamaha />,
      },
      {
        path: "/yamaha/:id",
        element: (
          <PrivateRoute>
            <SingleBikeFullInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // routes for dashboard

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/mybookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/manageproduct",
        element: <ManageProduct />,
      },
      {
        path: "/dashboard/verifyseller",
        element: <VerifySeller />,
      },
      {
        path: "/dashboard/allbuyers",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/allsellers",
        element: <AllSellers />,
      },
      {
        path: "/dashboard/reportedproducts",
        element: <ReportedProducts />,
      },
    ],
  },
]);

export default routes;
