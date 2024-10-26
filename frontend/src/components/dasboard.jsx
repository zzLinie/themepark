import PropTypes from "prop-types";

function Input({ inputNaming, inputType, inputText, req, maxLength }) {
  return (
    <div>
      <label htmlFor={inputNaming}>{inputText}</label>
      <input
        type={inputType}
        name={inputNaming}
        id={inputNaming}
        required={req}
        maxLength={maxLength}
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
};

export { Input };
