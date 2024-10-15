import "./form.css";

export default function Form({
  heading,
  subheading,
  label1Text,
  label2Text,
  submitText,
}) {
  return (
    <div className="form-container">
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <form action="">
        <label htmlFor="">{label1Text}</label>
        <input type="email" />
        <label htmlFor="">{label2Text}</label>
        <input type="password" />
        <input type="submit" value={submitText} />
      </form>
    </div>
  );
}
