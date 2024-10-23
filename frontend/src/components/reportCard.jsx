import "./reportCard.css";
import PropTypes from "prop-types";

export default function ReportCard({ reportHeading }) {
  return (
    <div className="card">
      <p>{reportHeading}</p>
      <label htmlFor="startDate">Start Date</label>
      <input type="date" name="startDate" id="startDate" />
      <label htmlFor="endDate">End Date</label>
      <input type="date" name="endDate" id="endDate" />
      <button>Generate</button>
      <h1>433</h1>
    </div>
  );
}
ReportCard.propTypes = {
  reportHeading: PropTypes.string,
};
