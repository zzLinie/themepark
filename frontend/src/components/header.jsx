import Button from "./button";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <div className="header-container">
      <Link to="/">
        <h1>Themepark</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/rides">Rides</Link>
        <Link to="/dining">Dining</Link>
        <Link to="/events">Events</Link>
        <Link to="/giftshops">Shops</Link>
        <Link to={"/login/employees/dashboard"}>Employee Dashboard</Link>
        <Link to={"/login/admin/reports"}>Admin Dashboard</Link>
      </div>
      <div className="header-button-container">
        <Link to="/ticket">
          <Button buttonClass="ticketButton" buttonText="Buy a Ticket" />
        </Link>
        <Link to="/login">
          <Button buttonClass="loginButton" buttonText="Dashboad Login" />
        </Link>
      </div>
    </div>
  );
}
