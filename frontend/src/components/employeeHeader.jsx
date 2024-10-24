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
          <Link to={"/employees/restaurant"}>Restaurant</Link>
          <Link to={"/employees/shops"}>Gift Shops</Link>
          <Link to={"/employees/rides"}>Rides</Link>
          <Link to={"/employees/events"}>Special Events</Link>
        </div>
        <Link to={"/"}>Log Out</Link>
      </div>
      <div className="employee-banner">
        <h1>Employee Dashboard</h1>
      </div>
    </>
  );
}
