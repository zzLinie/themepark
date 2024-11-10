import { Link } from "react-router-dom";
import Header from "../components/header";
import "./login.css";

export default function Login() {
  return (
    <div className="login-page">
      <Header />
      <h1>Select Your Login</h1>
      <div className="login-container">
        <div className="redirect-container">
          <Link to={"/login/admin"}>
            <button className="admin-login">Admin Login</button>
          </Link>
          <Link to={"/login/employee"}>
            <button className="employee-login">Employee Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
