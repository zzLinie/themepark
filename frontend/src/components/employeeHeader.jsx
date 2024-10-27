import "./employeeHeader.css";
import { Link } from "react-router-dom";

export default function EmployeeHeader() {
  return (
    <>
      <div className="employee-header">
        <a href="">
          <h1>Themepark</h1>
        </a>
        <div className="employee-tabs">
          <Link to={"/employees/shop"}>Gift Shop</Link>
          <Link to={"/employees/events"}>Events</Link>
          <Link to={"/employees/restaurant"}>Restaurant</Link>
          <Link to={"/employees/ride"}>Rides</Link>
        </div>
        <Link to={"/"}>Log Out</Link>
      </div>
      <div className="employee-banner">
        <h1>Employee Dashboard</h1>
      </div>
    </>
  );
}
