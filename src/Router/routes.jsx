import AdminRoute from "../AdminRoute/AdminRoute";
import SingleBikeFullInfo from "../Components/SingleBikeFullInfo/SingleBikeFullInfo";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import AddProduct from "../Pages/DashboardPages/AddProduct/AddProduct";
import AllSellers from "../Pages/DashboardPages/AllSellers/AllSellers";
import AllUsers from "../Pages/DashboardPages/AllUsers/AllUsers";
import Dashboard from "../Pages/DashboardPages/Dashboard/Dashboard";
import ManageProduct from "../Pages/DashboardPages/ManageProduct/ManageProduct";
import SoldProduct from "../Pages/DashboardPages/ManageProduct/SoldProduct";
import MyBookings from "../Pages/DashboardPages/MyBookings/MyBookings";
import Payment from "../Pages/DashboardPages/Payment/Payment";
import Profile from "../Pages/DashboardPages/Profile/Profile";
import ReportedProducts from "../Pages/DashboardPages/ReportedProducts/ReportedProducts";
import VerifyApplication from "../Pages/DashboardPages/VerifyApplication/VerifyApplication";
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
import SellerRoute from "../SellerRoute/SellerRoute";
import UserRoot from "../UserRoot/UserRoot";

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
        path: "/mv",
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
        path: "/blogs",
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Profile />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/mybookings",
        element: (
          <UserRoot>
            <MyBookings />
          </UserRoot>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <UserRoot>
            <Payment />
          </UserRoot>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/manageproduct",
        element: (
          <SellerRoute>
            <ManageProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/verifyrequest",
        element: (
          <SellerRoute>
            <VerifySeller />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/soldbikes",
        element: (
          <SellerRoute>
            <SoldProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/verifyseller",
        element: (
          <AdminRoute>
            <VerifyApplication />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedproducts",
        element: (
          <AdminRoute>
            <ReportedProducts />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;
