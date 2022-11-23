import { RouterProvider } from "react-router-dom";
import routes from "./Router/routes";
import '@splidejs/react-splide/css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
