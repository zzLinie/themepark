import { forwardRef } from "react";
import { Input } from "./dasboard";
import PropTypes from "prop-types";

const Modal = forwardRef(function Modal(
  {
    ssn,
    fName,
    mInitial,
    lName,
    age,
    dob,
    pNumber,
    address,
    city,
    state,
    zip,
    hourly,
  },
  ref
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <dialog ref={ref}>
      <form onSubmit={handleSubmit}>
        <Input
          inputNaming={"empSSN"}
          inputText={"SSN"}
          inputType={"number"}
          value={ssn}
        />
        <Input
          inputNaming={"empFname"}
          inputText={"First Name"}
          inputType={"text"}
          value={fName}
        />
        <Input
          inputNaming={"empMinitial"}
          inputText={"Middle Initial"}
          inputType={"text"}
          value={mInitial}
          maxLength={1}
        />
        <Input
          inputNaming={"empLname"}
          inputText={"Last Name"}
          inputType={"text"}
          maxLength={30}
          value={lName}
        />
        <Input
          inputNaming={"empAge"}
          inputType={"number"}
          inputText={"Age"}
          value={age}
        />
        <Input
          inputNaming={"empDOB"}
          inputText={"Date of Birth"}
          inputType={"date"}
          value={dob}
        />
        <Input
          inputText={"Phone Number"}
          inputNaming={"phoneNumber"}
          inputType={"text"}
          maxLength={20}
          value={pNumber}
        />
        <Input
          inputNaming={"address"}
          inputText={"Address"}
          inputType={"text"}
          maxLength={50}
          value={address}
        />
        <Input
          inputNaming={"city"}
          inputText={"City"}
          inputType={"text"}
          maxLength={30}
          value={city}
        />
        <Input
          inputNaming={"state"}
          inputText={"State"}
          inputType={"text"}
          maxLength={2}
          value={state}
        />
        <Input
          inputNaming={"zipCode"}
          inputText={"Zip Code"}
          inputType={"number"}
          value={zip}
        />
        <Input
          inputNaming={"hourly"}
          inputText={"Hourly Pay"}
          inputType={"number"}
          value={hourly}
        />

        <button type="submit">Update</button>
        <button type="button" onClick={() => ref.current.close()}>
          Close
        </button>
      </form>
    </dialog>
  );
});

Modal.propTypes = {
  ssn: PropTypes.number,
  fName: PropTypes.string,
  mInitial: PropTypes.string,
  lName: PropTypes.string,
  age: PropTypes.number,
  dob: PropTypes.string,
  pNumber: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.number,
  hourly: PropTypes.string,
};

export default Modal;
