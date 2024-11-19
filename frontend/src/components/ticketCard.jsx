import PropTypes from "prop-types";

export default function TicketCard({
  ticketType,
  customerID,
  Fname,
  ticketCount,
  startDate,
}) {
  return (
    <div className="ticket-card">
      <div>
        <h3>🎟️ {Fname} Ticket</h3>
      </div>
      <div>
        <p>
          <strong>Customer ID:</strong> {customerID}
        </p>
        <p>
          <strong>Ticket Type:</strong> {ticketCount + " " + ticketType} Ticket
        </p>
        <p>
          <strong>Buy Date:</strong> {startDate}
        </p>
      </div>
    </div>
  );
}

TicketCard.propTypes = {
  ticketCount: PropTypes.number,
  ticketType: PropTypes.string,
  startDate: PropTypes.instanceOf(Date), // Accept Date object
  customerID: PropTypes.number,
  Fname: PropTypes.string,
};
