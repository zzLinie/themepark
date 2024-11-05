import "./adminHeader.css";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <>
      <div className="admin-header">
        <Link to="/">
          <h1>Themepark</h1>
        </Link>
        <div className="admin-tabs">
          <Link to={"/admin/reports"}>Reports</Link>
          <Link to={"/admin/employees"}>Employees</Link>
          <Link to={"/admin/parkstatus"}>Park Status</Link>
        </div>
        <Link to={"/"}>Log Out</Link>
      </div>
      <div className="admin-banner">
        <h1>Admin Dashboard</h1>
      </div>
    </>
  );
}
