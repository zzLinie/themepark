import Form from "../components/form";
import Header from "../components/header";
import "./adminLogin.css";

export default function AdminLogin() {
  return (
    <div className="admin-page-container">
      <Header />
      <div className="admin-login-container">
        <Form
          heading="Admin Login"
          subheading="Login with admin credentials"
          label1Text="Email"
          label2Text="Password"
          submitText="Log In"
        />
      </div>
    </div>
  );
}
