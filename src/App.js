import { RouterProvider } from "react-router-dom";
import routes from "./Router/routes";
import '@splidejs/react-splide/css';
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-photo-view/dist/react-photo-view.css';

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
