import PropTypes from "prop-types";

export default function TicketCard({
  ticketType,
  customerID,
  Fname,
  Lname,
  ticketCount,
  phoneNumber,
  dataCustomerID,
  dataCustomerTicketType,
  onClick,
}) {
  return (
    <>
      <div data-id={dataCustomerID} data-ticketType={dataCustomerTicketType}>
        <p>Customer ID: {customerID}</p>
        <p>First Name: {Fname}</p>
        <p>Last Name: {Lname}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>{`${ticketCount} ${ticketType} tickets`}</p>
        <button onClick={onClick}>View Details</button>
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
  dataCustomerID: PropTypes.number,
  dataCustomerTicketType: PropTypes.number,
  onClick: PropTypes.func,
};
