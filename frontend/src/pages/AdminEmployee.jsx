import { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Input } from "../components/dasboard";
import "./adminEmployees.css";
import axios from "axios";

export default function AdminEmployee() {
  const [values, setValues] = useState({});
  const [employeeList, setEmployeeList] = useState([]);

  const handleChildData = (dataObj) => {
    setValues({ ...values, ...dataObj });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postData = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/employee/create", values)
      .then((res) => res.data)
      .then((res) => alert(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/read")
      .then((res) => setEmployeeList(res.data.result))
      .catch((err) => console.error(err));
  }, [postData]);

  return (
    <>
      <AdminHeader />
      <table>
        <thead>
          <tr>
            <th>SSN</th>
            <th>First Name</th>
            <th>M Initial</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Dept ID</th>
            <th>Hourly</th>
            <th>Position</th>
            <th>Benefits</th>
            <th>Supervisor ID</th>
            <th>Email</th>
          </tr>
        </thead>

        {employeeList.map((val, key) => {
          return (
            <>
              <tbody key={key}>
                <tr>
                  <td>{val.Ssn}</td>
                  <td>{val.Fname}</td>
                  <td>{val.Minitial}</td>
                  <td>{val.Lname}</td>
                  <td>{val.Age}</td>
                  <td>{val.DOB}</td>
                  <td>{val.Phonenumber}</td>
                  <td>{val.Address}</td>
                  <td>{val.City}</td>
                  <td>{val.State}</td>
                  <td>{val.Zipcode}</td>
                  <td>{val.Departmentid}</td>
                  <td>{val.Hourlypay}</td>
                  <td>{val.Position}</td>
                  <td>{val.Benefits}</td>
                  <td>{val.Supervisorssn}</td>
                  <td>{val.EmployeeEmail}</td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
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
