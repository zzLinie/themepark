import PropTypes from "prop-types";

function Input({
  inputNaming,
  inputType,
  inputText,
  req,
  maxLength,
  handleInputChange,
  min,
  max,
  value,
  readOnly,
}) {
  const handleChange = (e) => {
    const dataObj = {
      [inputNaming]: e.target.value,
    };
    handleInputChange(dataObj);
  };
  return (
    <div>
      <label htmlFor={inputNaming}>{inputText}</label>
      <input
        type={inputType}
        name={inputNaming}
        id={inputNaming}
        required={req}
        maxLength={maxLength}
        onChange={handleChange}
        min={min}
        max={max}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
}

function InputDialog({
  inputNaming,
  inputType,
  inputText,
  req,
  maxLength,
  onChange,
  min,
  max,
  value,
  readOnly,
}) {
  return (
    <div>
      <label htmlFor={inputNaming}>{inputText}</label>
      <input
        type={inputType}
        name={inputNaming}
        id={inputNaming}
        required={req}
        maxLength={maxLength}
        onChange={onChange}
        min={min}
        max={max}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
}

Input.propTypes = {
  inputNaming: PropTypes.string,
  inputType: PropTypes.string,
  inputText: PropTypes.string,
  req: PropTypes.any,
  maxLength: PropTypes.any,
  handleInputChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.any,
  readOnly: PropTypes.any,
};
InputDialog.propTypes = {
  inputNaming: PropTypes.string,
  inputType: PropTypes.string,
  inputText: PropTypes.string,
  req: PropTypes.any,
  maxLength: PropTypes.any,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.any,
  readOnly: PropTypes.any,
};
export { Input, InputDialog };
