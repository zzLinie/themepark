import Button from "./button";
import "./header.css";

export default function Header() {
  return (
    <div className="header-container">
      <a href="">
        <h1>Theme park</h1>
      </a>
      <div className="links">
        <a href="">Home</a>
        <a href="">Rides & More</a>
        <a href="">Events</a>
      </div>
      <div className="header-button-container">
        <a href="">
          <Button buttonClass="ticketButton" buttonText="Buy a Ticket" />
        </a>
        <a href="">
          <Button buttonClass="loginButton" buttonText="Admin Login" />
        </a>
      </div>
    </div>
  );
}
