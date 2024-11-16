import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminProtectedRoute() {
  const { auth, role } = useAuth();
  if (auth === null) {
    // Optionally handle a loading state or don't render the route
    return null; // or a loading spinner
  }
  if (auth && role == "Admin") {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
}
