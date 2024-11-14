import PropTypes from "prop-types";

export default function TicketCard({
  ticketType,
  customerID,
  Fname,
  Lname,
  ticketCount,
  phoneNumber,
}) {
  return (
    <>
      <div>
        <p>Customer ID: {customerID}</p>
        <p>First Name: {Fname}</p>
        <p>Last Name: {Lname}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>{`${ticketCount} ${ticketType} tickets`}</p>
      </div>
      <br></br>
    </>
  );
}

TicketCard.propTypes = {
  ticketCount: PropTypes.number,
  ticketType: PropTypes.string,
  startDate: PropTypes.instanceOf(Date), // Accept Date object
  expiryDate: PropTypes.instanceOf(Date), // Accept Date object
  customerID: PropTypes.number,
  Fname: PropTypes.string,
  Lname: PropTypes.string,
  phoneNumber: PropTypes.string,
};
