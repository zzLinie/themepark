import { Input } from "../components/dasboard";
import EmployeeHeader from "../components/employeeHeader";
import "./employeeShop.css";

export default function EmployeeShop() {
  return (
    <>
      <EmployeeHeader />
      <div className="s-employee-card">
        <h1>Create Gift Shop</h1>
        <form action="" className="s-employee-form">
          <Input
            inputNaming={"shopName"}
            inputText={"Gift Shop Name"}
            inputType={"text"}
            maxLength={50}
            req
          />
          <Input
            inputNaming={"shopLocation"}
            inputText={"Location"}
            inputType={"text"}
            maxLength={50}
          />
          <div className="products-container">
            <p>Products</p>
            <Input
              inputNaming={"shirt"}
              inputText={"T-Shirt"}
              inputType={"checkbox"}
            />
            <Input
              inputNaming={"mugs"}
              inputText={"Mugs"}
              inputType={"checkbox"}
            />
            <Input
              inputNaming={"hats"}
              inputText={"Hats"}
              inputType={"checkbox"}
            />
            <Input
              inputNaming={"glasses"}
              inputText={"Glasses"}
              inputType={"checkbox"}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
