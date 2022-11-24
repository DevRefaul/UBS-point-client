import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import Error from "../Pages/Error/Error";
import BMW from "../Pages/Home/BMW/BMW";
import Home from "../Pages/Home/Home";
import Honda from "../Pages/Honda/Honda";
import Login from "../Pages/Login/Login";
import MVAgusta from "../Pages/MVAgusta/MVAgusta";
import Register from "../Pages/Register/Register";
import Yamaha from "../Pages/Yamaha/Yamaha";
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
        element: <Honda />,
      },
      {
        path: "/bmw",
        element: <BMW />,
      },
      {
        path: "/bmw/:id",
        element: <BMW />,
      },
      {
        path: "/mvagusta",
        element: <MVAgusta />,
      },
      {
        path: "/mvagusta/:id",
        element: <MVAgusta />,
      },
      {
        path: "/yamaha",
        element: <Yamaha />,
      },
      {
        path: "/yamaha/:id",
        element: <Yamaha />,
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
  // {
  //   path: "/dashboard",
  //   children: [
  //     {
  //       path: "/profile",
  //     },
  //     {
  //       path: "/myorders",
  //     },
  //     {
  //       path: "/addproduct",
  //     },
  //     {
  //       path: "/manageproduct",
  //     },
  //     {
  //       path: "/alluser",
  //     },
  //     {
  //       path: "/allseller",
  //     },
  //     {
  //       path: "/reportedproducts",
  //     },
  //   ],
  // },
]);

export default routes;
