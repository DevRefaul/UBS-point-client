import Categorys from "../Pages/Categorys/Categorys";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
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
        path: "/categorys",
        element: <Categorys />,
      },
    ],
  },
]);

export default routes;
