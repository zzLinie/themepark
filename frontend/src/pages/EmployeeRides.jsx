import { Input } from "../components/dasboard";
import EmployeeHeader from "../components/employeeHeader";
import "./employeeRide.css";

export default function EmployeeRides() {
  return (
    <div>
      <EmployeeHeader />
      <div className="ride-employee-card">
        <h1>Create Ride</h1>
        <form action="" className="ride-employee-form">
          <Input
            inputNaming={"rideName"}
            inputText={"Ride Name"}
            inputType={"text"}
            maxLength={50}
            req
          />
          <Input
            inputNaming={"capacity"}
            inputText={"Capacity"}
            inputType={"number"}
            req
          />
          <Input
            inputNaming={"openHours"}
            inputText={"Ride Open Time"}
            inputType={"time"}
            req
          />
          <Input
            inputNaming={"closeHours"}
            inputText={"Ride Close Time"}
            inputType={"time"}
            req
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
