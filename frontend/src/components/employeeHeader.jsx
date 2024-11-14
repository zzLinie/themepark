import "./employeeHeader.css";
import { Link } from "react-router-dom";
import Button from "./button";

export default function EmployeeHeader() {
  return (
    <>
      <div className="employee-header">
        <Link to="/">
          <h1>Themepark</h1>
        </Link>
        <div className="employee-tabs">
          <Link to={"/login/employees/shop"}>Shop</Link>
          <Link to={"/login/employees/events"}>Events</Link>
          <Link to={"/login/employees/ride"}>Rides</Link>
        </div>
        <div className="header-button-container">
        <Link to="/"Log Out>
          <Button buttonClass="logoutbutton" buttonText="Log Out" />
        </Link>
      </div>
      </div>
      <div className="employee-banner">
        <h1>Employee Dashboard</h1>
      </div>
    </>
  );
}
