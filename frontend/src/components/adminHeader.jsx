import "./adminHeader.css";
import Button from "./button"
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <>
      <div className="admin-header">
        <Link to="/">
          <h1>Themepark</h1>
        </Link>
        <div className="admin-tabs">
          <Link to={"/login/admin/reports"}>Reports</Link>
          <Link to={"/login/admin/employees"}>Employees</Link>
          <Link to={"/login/admin/parkstatus"}>Park Status</Link>
          <Link to={"/login/admin/tickets"}>Tickets</Link>
        </div>
        <div className="header-button-container">
        <Link to="/"Log Out>
          <Button buttonClass="logoutbutton" buttonText="Log Out" />
        </Link>
      </div>
      </div>
      <div className="admin-banner">
        <h1>Admin Dashboard</h1>
        </div>
    </>
  );
}
