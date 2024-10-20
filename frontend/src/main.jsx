import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import AdminLogin from "./pages/AdminLogin";
import Rides from "./pages/Rides";
import Dining from "./pages/Dining";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Page Not Found</div>,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/rides",
    element: <Rides />,
  },
  {
    path: "/dining",
    element: <Dining />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
