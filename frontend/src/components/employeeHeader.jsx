import "./employeeHeader.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthProvider";
import Image from "../assets/images/ticket.png";

export default function EmployeeHeader() {
  const { setAuth, setRole, welcomeMessage, setWelcomeMessage } = useAuth();
  const handleLogout = () => {
    axios
      .post("https://themepark-backend.onrender.com/admin/logout", [], {
        withCredentials: true,
      })
      .then((res) => {
        setAuth(false);
        setRole("");
        setWelcomeMessage("");
        alert(res.data.Response);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="employee-header">
        <Link to="/">
          <img src={Image} alt="" />
        </Link>
        <div className="employee-tabs">
          <Link to={"/login/employees/home"}>Home</Link>
          <Link to={"/login/employees/shop"}>Shop</Link>
          <Link to={"/login/employees/events"}>Events</Link>
          <Link to={"/login/employees/ride"}>Rides</Link>
        </div>
        <div className="header-button-container">
          <Link to="/login" Log Out>
            <button className="logoutbutton" onClick={handleLogout}>
              Log Out
            </button>
          </Link>
        </div>
      </div>
      <div className="employee-banner">
        <h1>
          Employee Dashboard - <span>Welcome {welcomeMessage}</span>
        </h1>
      </div>
    </>
  );
}
