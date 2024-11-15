import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function EmployeeProtectedRoute() {
  const { auth, role } = useAuth();
  if (auth && role == "Employee") {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

EmployeeProtectedRoute.propTypes = {
  auth: PropTypes.bool,
};
