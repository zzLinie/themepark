import "./form.css";
import { useState } from "react";

export default function Form({
  heading,
  subheading,
  label1Text,
  label2Text,
  submitText,
}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userInput = (e) => {
    //update userName variable as user types
    setUserName(e.target.value);
  };
  const passwordInput = (e) => {
    //update password variable as user types
    setPassword(e.target.value);
  };
  const getInput = (e) => {
    e.preventDefault();
    return {
      user: userName,
      password: password,
    };
  };
  return (
    <div className="form-container">
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <form onSubmit={getInput}>
        <label htmlFor="">{label1Text}</label>
        <input type="text" onChange={userInput} />
        <label htmlFor="">{label2Text}</label>
        <input type="password" onChange={passwordInput} />
        <input type="submit" value={submitText} />
      </form>
    </div>
  );
}
