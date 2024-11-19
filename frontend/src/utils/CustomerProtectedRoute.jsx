import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function CustomerProtectedRoute() {
  const { auth, role, setAuthMessage } = useAuth();
  if (auth === null) {
    return null;
  }
  if (auth && role == "Customer") {
    return <Outlet />;
  }
  setAuthMessage("Please log in as a customer");
  return <Navigate to={"/customer-login"} />;
}
