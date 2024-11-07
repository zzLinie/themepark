import { useState } from "react";
import Header from "../components/header";
import "./adminLogin.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ authProp }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://themepark-server.vercel.app/admin", values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.auth) {
          alert("Granted Access");
          axios
            .get("https://themepark-server.vercel.app/admin/verify", {
              withCredentials: true,
            })
            .then((res) => {
              authProp(res.data.Verify);
              if (res.data.Verify) {
                navigate("/login/admin/reports");
              }
            });
        } else {
          alert(res.data.Response);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="admin-page-container">
      <Header />
      <div className="admin-login-container">
        <div className="form-container">
          <h1>Log In</h1>
          <p>Log in with admin credentials</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) =>
                setValues({ ...values, userName: e.target.value })
              }
              type="text"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {
  authProp: PropTypes.bool,
};
