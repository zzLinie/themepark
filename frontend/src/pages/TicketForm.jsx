import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import "./ticketForm.css";
import { useTicket } from "../utils/TicketContext";
import { useCart } from "../utils/CartContext";

const TicketForm = () => {
  const { totalTickets, setTotalTickets } = useCart();
  // prettier-ignore
  const { childQuantity, adultQuantity, seniorQuantity, setChildQuantity, 
    setAdultQuantity, setSeniorQuantity, totalPrice,
    setTotalPrice,
} = useTicket();
  // Initialize state for form data
  const [visitDate, setVisitDate] = useState({});
  const [ticketAvailibility, setTicketAvailibility] = useState(0);
  const [recievedTicketAvailibility, setRecievedTicketAvailibility] =
    useState(0);

  //get ticket availibility according to toggled date
  useEffect(() => {
    //reset ticket cart after date filter change
    setAdultQuantity(0);
    setChildQuantity(0);
    setSeniorQuantity(0);
    setTotalPrice(0);
    setTotalTickets(0);

    axios
      .post(
        "https://themepark-backend.onrender.com/adminTickets/availibility",
        visitDate
      )
      .then((res) => {
        setTicketAvailibility(res.data.Response);
        setRecievedTicketAvailibility(res.data.Response);
      })
      .catch((err) => alert(err));
  }, [visitDate]);
  // Prices for each ticket type
  const ticketPrices = {
    child: 30, // Example price for child tickets
    adult: 40, // Example price for adult tickets
    senior: 25, // Example price for senior tickets
  };
  const [parkDays, setParkDays] = useState([]);
  const getVisitDays = () => {
    axios
      .get("https://themepark-backend.onrender.com/adminTickets/days")
      .then((res) => setParkDays(res.data.Response))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    getVisitDays();
  }, []);

  // Recalculate total tickets and price whenever quantities change
  useEffect(() => {
    const total = childQuantity + adultQuantity + seniorQuantity;
    setTotalTickets(total);

    const price =
      childQuantity * ticketPrices.child +
      adultQuantity * ticketPrices.adult +
      seniorQuantity * ticketPrices.senior;
    setTotalPrice(price);
  }, [childQuantity, adultQuantity, seniorQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tickets = [
      { type: 0, quantity: childQuantity }, // child
      { type: 1, quantity: adultQuantity }, // adult
      { type: 2, quantity: seniorQuantity }, //senior
    ];
    const { date } = visitDate;

    const data = {
      tickets,
      date,
    };

    // Example of sending data to the server (you can replace the URL)
    axios
      .post(
        "https://themepark-backend.onrender.com/tickets/purchase-tickets",
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert(res.data.Response);
        // Optionally, handle response (redirect, alert, etc.)
      })
      .catch((error) => {
        alert(error.response.data.details);
      });
  };

  return (
    <>
      <Header />
      <div className="dataentryformcontainer">
        <h1>Purchase Ticket</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="child">Child Ticket ${ticketPrices.child}</label>
          <div className="quantity-selector">
            <input
              type="text"
              name="child"
              id="child"
              value={childQuantity}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                setChildQuantity((prev) => prev + 1);
                setTicketAvailibility((prev) => Math.max(prev - 1, 0));
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setChildQuantity((prev) => Math.max(prev - 1, 0));
                setTicketAvailibility((prev) => prev + 1);
              }}
            >
              -
            </button>
          </div>

          <label htmlFor="adult">Adult Ticket ${ticketPrices.adult}</label>
          <div className="quantity-selector">
            <input
              type="text"
              name="adult"
              id="adult"
              value={adultQuantity}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                setAdultQuantity((prev) => prev + 1);
                setTicketAvailibility((prev) => Math.max(prev - 1, 0));
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setAdultQuantity((prev) => Math.max(prev - 1, 0));
                setTicketAvailibility((prev) => prev + 1);
              }}
            >
              -
            </button>
          </div>

          <label htmlFor="senior">Senior Ticket ${ticketPrices.senior}</label>
          <div className="quantity-selector">
            <input
              type="text"
              name="senior"
              id="senior"
              value={seniorQuantity}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                setSeniorQuantity((prev) => prev + 1);
                setTicketAvailibility((prev) => Math.max(prev - 1, 0));
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setSeniorQuantity((prev) => Math.max(prev - 1, 0));
                setTicketAvailibility((prev) => prev + 1);
              }}
            >
              -
            </button>
          </div>
          <div className="ticket-date-container">
            <label htmlFor="">Plan your Visit</label>
            <select
              required
              name=""
              id=""
              onChange={(e) =>
                setVisitDate({ ...visitDate, date: e.target.value })
              }
            >
              <option disabled selected value="">
                Plan your visit
              </option>
              {parkDays &&
                parkDays.map((day) => {
                  return (
                    <>
                      <option value={day.Date}>{day.Date}</option>
                    </>
                  );
                })}
            </select>
          </div>

          {/* Display Total Tickets and Total Price */}
          <div className="cart-summary">
            <p>
              <strong>Ticket Availibility: </strong>
              {ticketAvailibility > 0 ? ticketAvailibility : 0}
            </p>
            <p>Total Tickets: {totalTickets}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>

          <button disabled={ticketAvailibility == 0} type="submit">
            Purchase
          </button>
        </form>
      </div>
    </>
  );
};

export default TicketForm;
