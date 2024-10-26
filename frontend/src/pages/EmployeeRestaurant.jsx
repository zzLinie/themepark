import { Input } from "../components/dasboard";
import EmployeeHeader from "../components/employeeHeader";
import "./employeeRestaurant.css";

export default function EmployeeRestaurant() {
  return (
    <div>
      <EmployeeHeader />
      <div className="r-employee-card">
        <h1>Create Restaurant</h1>
        <form action="" className="r-employee-form">
          <Input
            inputNaming={"restaurantName"}
            inputText={"Restaurant Name"}
            inputType={"text"}
            req
            maxLength={50}
          />
          <Input
            inputNaming={"location"}
            inputText={"Location"}
            inputType={"text"}
            maxLength={50}
          />
          <div>
            <select name="restuarants" id="restuarants" required>
              <option value="Restaurant Type" disabled selected>
                Select Restaurant Type
              </option>
              <option value="Mexican Food">Mexican Food</option>
              <option value="Italian Food">Italian Food</option>
              <option value="Snacks and Beverages">Snacks and Beverages</option>
              <option value="">Desserts</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
