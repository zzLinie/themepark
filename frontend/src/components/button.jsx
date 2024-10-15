import "./button.css";

export default function Button(props) {
  return (
    <>
      <button className={props.buttonClass}>{props.buttonText}</button>
    </>
  );
}
