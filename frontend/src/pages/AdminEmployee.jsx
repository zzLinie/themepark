import { useEffect, useRef, useState } from "react";
import AdminHeader from "../components/adminHeader";
import { Input } from "../components/dasboard";
import "./adminEmployees.css";
import axios from "axios";
import Modal from "../components/modal";

export default function AdminEmployee() {
  const [values, setValues] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [employeeData, setEmployeeData] = useState([
    {
      Ssn: NaN,
      Fname: "",
      Minitial: "",
      Lname: "",
      Age: NaN,
      Dateofbirth: "",
      Phonenumber: "",
      Address: "",
      City: "",
      State: "",
      Zipcode: NaN,
      Hourlypay: "",
    },
  ]);
  const modalRef = useRef(null);

  const handleChildData = (dataObj) => {
    setValues({ ...values, ...dataObj });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "http://localhost:3000/employee/create",
        values
      );
      alert(request.data);
      await getEmployees();
    } catch (err) {
      if (err) alert(err);
    }
  };

  const deleteRow = (idVal) => {
    axios
      .delete(`http://localhost:3000/employee/delete/${idVal}`)
      .then((res) => {
        alert(res.data);
        setEmployeeList(
          employeeList.filter((value) => {
            return value.idVal !== idVal;
          })
        );
        //change delete state variable everytime delete button is clicked
        deleteState == false ? setDeleteState(true) : setDeleteState(false);
      })
      .catch((err) => console.error(err));
  };

  const getEmployees = () => {
    axios
      .get("http://localhost:3000/employee/read")
      .then((res) => setEmployeeList(res.data.result))
      .catch((err) => console.error(err));
  };

  //renders employee list after delete button click
  useEffect(() => {
    getEmployees();
  }, [deleteState]);

  const getEmployeeData = (ssn) => {
    axios
      .get(`http://localhost:3000/employee/read/${ssn}`)
      .then((res) => {
        setEmployeeData({ ...employeeData, ...res.data.result });
        const modal = modalRef.current;
        modal.showModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AdminHeader />
      <Modal
        ref={modalRef}
        ssn={employeeData[0].Ssn}
        fName={employeeData[0].Fname}
        lName={employeeData[0].Lname}
        age={employeeData[0].Age}
        dob={employeeData[0].Dateofbirth}
        pNumber={employeeData[0].Phonenumber}
        address={employeeData[0].Address}
        city={employeeData[0].City}
        state={employeeData[0].State}
        zip={employeeData[0].Zipcode}
        hourly={employeeData[0].Hourlypay}
      />
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
            <th>Action</th>
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
                  <div className="table-btn-container">
                    <button onClick={() => deleteRow(val.Ssn)}>Delete</button>
                    <button onClick={() => getEmployeeData(val.Ssn)}>
                      Edit
                    </button>
                  </div>
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
            value={employeeData[0].Ssn}
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
