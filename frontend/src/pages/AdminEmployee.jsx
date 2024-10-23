import AdminHeader from "../components/adminHeader";
import "./adminEmployees.css";

export default function AdminEmployee() {
  return (
    <>
      <AdminHeader />
      <div className="employee-card">
        <h1>Add Employee</h1>
        <form
          action=""
          className="employee-form
"
        >
          <div>
            <label htmlFor="empSSN">SSN</label>
            <input type="number" name="empSSN" id="empSSN" required />
          </div>

          <div>
            <label htmlFor="empFname">First Name</label>
            <input type="text" name="empFname" id="empFname" maxLength={30} />
          </div>

          <div>
            <label htmlFor="empMinitial">Middle Initial</label>
            <input
              type="text"
              name="empMinitial"
              id="empMinitial"
              maxLength={1}
            />
          </div>

          <div>
            <label htmlFor="empLname">Last Name</label>
            <input type="text" name="empLname" id="empLname" maxLength={30} />
          </div>

          <div>
            <label htmlFor="empAge">Age</label>
            <input type="number" name="empAge" id="empAge" required />
          </div>

          <div>
            <label htmlFor="empDOB">Date of Birth</label>
            <input type="date" name="empDOB" id="empDOB" required />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              maxLength={20}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" maxLength={50} />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" maxLength={30} />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" maxLength={2} />
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input type="number" name="zipCode" id="zipCode" />
          </div>

          <div>
            <label htmlFor="hourly">Hourly Pay</label>
            <input type="number" name="hourly" id="hourly" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
