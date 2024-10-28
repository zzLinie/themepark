import PropTypes from "prop-types";
import "./eventSection.css";
export default function EventSection({
  eventName,
  eventImage,
  eventStart,
  eventEnd,
  eventDescription,
}) {
  return (
    <section>
      <div
        className="event-container"
        style={{ backgroundImage: `url(${eventImage})` }}
      >
        <h1>{eventName}</h1>
        <p>{`Start Date: ${eventStart}`}</p>
        <p>{`End Date: ${eventEnd}`}</p>
        <p>{eventDescription}</p>
      </div>
    </section>
  );
}

EventSection.propTypes = {
  eventName: PropTypes.string,
  eventStart: PropTypes.string,
  eventEnd: PropTypes.string,
  eventDescription: PropTypes.string,
  eventImage: PropTypes.string,
};
