import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AdminProtectedRoute() {
  const { auth, role } = useAuth();

  if (auth && role == "Admin") {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
}
