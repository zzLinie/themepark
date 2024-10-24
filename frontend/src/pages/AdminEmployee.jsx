import AdminHeader from "../components/adminHeader";
import { Input } from "../components/dasboard";
import "./adminEmployees.css";

export default function AdminEmployee() {
  return (
    <>
      <AdminHeader />
      <div className="employee-card">
        <h1>Add Employee</h1>
        <form action="" className="employee-form">
          <Input
            inputNaming={"empSSN"}
            inputText={"SSN"}
            inputType={"text"}
            req
          />
          <Input
            inputNaming={"empFname"}
            inputText={"First Name"}
            inputType={"text"}
            req
          />
          <Input
            inputNaming={"empMinitial"}
            inputText={"Middle Initial"}
            inputType={"text"}
            maxLength={1}
          />
          <Input
            inputNaming={"empLname"}
            inputText={"Last Name"}
            inputType={"text"}
            maxLength={30}
          />
          <Input
            inputNaming={"empAge"}
            inputType={"number"}
            inputText={"Age"}
          />

          <Input
            inputNaming={"empDOB"}
            inputText={"Date of Birth"}
            req
            inputType={"date"}
          />

          <Input
            inputText={"Phone Number"}
            inputNaming={"phoneNumber"}
            inputType={"text"}
            maxLength={20}
          />
          <Input
            inputNaming={"address"}
            inputText={"Address"}
            inputType={"text"}
            maxLength={50}
          />
          <Input
            inputNaming={"city"}
            inputText={"City"}
            inputType={"text"}
            maxLength={30}
          />

          <Input
            inputNaming={"state"}
            inputText={"State"}
            inputType={"text"}
            maxLength={2}
          />

          <Input
            inputNaming={"zipCode"}
            inputText={"Zip Code"}
            inputType={"number"}
          />

          <Input
            inputNaming={"hourly"}
            inputText={"Hourly Pay"}
            inputType={"number"}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
