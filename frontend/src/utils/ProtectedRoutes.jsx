import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  let user = true;
  return user ? <Outlet /> : <Navigate to="/admin" />;
}
