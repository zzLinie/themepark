import { Input } from "../components/dasboard";
import EmployeeHeader from "../components/employeeHeader";
import "./employeeEvent.css";

export default function EmployeeEvents() {
  return (
    <div>
      <EmployeeHeader />
      <div className="event-employee-card">
        <h1>Create Event</h1>
        <form action="" className="event-employee-form">
          <Input
            inputNaming={"eventName"}
            inputText={"Event Name"}
            inputType={"text"}
            maxLength={"50"}
            req
          />
          <div>
            <label htmlFor="eventType">Event Type</label>
            <select name="eventType" id="eventType" required>
              <option value="holiday">Holiday Event</option>
              <option value="festival">Festival Event</option>
              <option value="performances">Performance Event</option>
              <option value="fireworks">Fireworks Show</option>
            </select>
          </div>
          <Input
            inputNaming={"eventDate"}
            inputText={"Event Date"}
            inputType={"date"}
          />
          <Input
            inputNaming={"eventTime"}
            inputText={"Event Start Time"}
            inputType={"time"}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
