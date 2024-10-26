import { useState } from "react";
import AdminHeader from "../components/adminHeader";
import { Input } from "../components/dasboard";
import "./adminEmployees.css";
import axios from "axios";

export default function AdminEmployee() {
  const [values, setValues] = useState({});

  const handleChildData = (dataObj) => {
    setValues({ ...values, ...dataObj });
  };

  const postData = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/employee/create", values);
  };

  return (
    <>
      <AdminHeader />

      <div className="employee-card">
        <h1>Add Employee</h1>
        <form action="" className="employee-form" onSubmit={postData}>
          <Input
            inputNaming={"empSSN"}
            inputText={"SSN"}
            inputType={"number"}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"empFname"}
            inputText={"First Name"}
            inputType={"text"}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"empMinitial"}
            inputText={"Middle Initial"}
            inputType={"text"}
            maxLength={1}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"empLname"}
            inputText={"Last Name"}
            inputType={"text"}
            maxLength={30}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"empAge"}
            inputType={"number"}
            inputText={"Age"}
            handleInputChange={handleChildData}
          />

          <Input
            inputNaming={"empDOB"}
            inputText={"Date of Birth"}
            inputType={"date"}
            handleInputChange={handleChildData}
          />

          <Input
            inputText={"Phone Number"}
            inputNaming={"phoneNumber"}
            inputType={"text"}
            maxLength={20}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"address"}
            inputText={"Address"}
            inputType={"text"}
            maxLength={50}
            handleInputChange={handleChildData}
          />
          <Input
            inputNaming={"city"}
            inputText={"City"}
            inputType={"text"}
            maxLength={30}
            handleInputChange={handleChildData}
          />

          <Input
            inputNaming={"state"}
            inputText={"State"}
            inputType={"text"}
            maxLength={2}
            handleInputChange={handleChildData}
          />

          <Input
            inputNaming={"zipCode"}
            inputText={"Zip Code"}
            inputType={"number"}
            handleInputChange={handleChildData}
          />

          <Input
            inputNaming={"hourly"}
            inputText={"Hourly Pay"}
            inputType={"number"}
            handleInputChange={handleChildData}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
