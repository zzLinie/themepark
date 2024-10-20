import Button from "./button";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <div className="header-container">
      <Link to="/">
        <h1>Theme park</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/attraction">Attractions</Link>
        <Link to="/events">Events</Link>
      </div>
      <div className="header-button-container">
        <Link to="/ticket">
          <Button buttonClass="ticketButton" buttonText="Buy a Ticket" />
        </Link>
        <Link to="/admin">
          <Button buttonClass="loginButton" buttonText="Admin Login" />
        </Link>
      </div>
    </div>
  );
}
