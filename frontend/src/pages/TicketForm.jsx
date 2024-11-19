import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import "./ticketForm.css";
import { useTicket } from "../utils/TicketContext";
import { useCart } from "../utils/CartContext";

const TicketForm = () => {
  const { totalTickets, setTotalTickets } = useCart();
  const {
    childQuantity,
    adultQuantity,
    seniorQuantity,
    setChildQuantity,
    setAdultQuantity,
    setSeniorQuantity,
    totalPrice,
    setTotalPrice,
  } = useTicket();

  const [visitDate, setVisitDate] = useState({});
  const [ticketAvailibility, setTicketAvailibility] = useState(0);
  const [recievedTicketAvailibility, setRecievedTicketAvailibility] =
    useState(0);
  const [warning, setWarning] = useState("");

  const ticketPrices = {
    child: 30,
    adult: 40,
    senior: 25,
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

  // Fetch availability when date changes
  useEffect(() => {
    setAdultQuantity(0);
    setChildQuantity(0);
    setSeniorQuantity(0);
    setTotalPrice(0);
    setTotalTickets(0);
    setWarning("");

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

  // Recalculate totals when quantities change
  useEffect(() => {
    const total = childQuantity + adultQuantity + seniorQuantity;
    setTotalTickets(total);

    const price =
      childQuantity * ticketPrices.child +
      adultQuantity * ticketPrices.adult +
      seniorQuantity * ticketPrices.senior;
    setTotalPrice(price);

    // Ensure availability doesn't go negative
    if (total > recievedTicketAvailibility) {
      setWarning("You cannot select more tickets than are available!");
    } else {
      setWarning("");
    }
  }, [childQuantity, adultQuantity, seniorQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ticketAvailibility <= 0) {
      alert("Tickets are sold out for the selected date!");
      return;
    }

    const tickets = [
      { type: 0, quantity: childQuantity }, // child
      { type: 1, quantity: adultQuantity }, // adult
      { type: 2, quantity: seniorQuantity }, // senior
    ];
    const { date } = visitDate;

    const data = {
      tickets,
      date,
    };

    axios
      .post(
        "https://themepark-backend.onrender.com/tickets/purchase-tickets",
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAdultQuantity(0);
        setChildQuantity(0);
        setSeniorQuantity(0);
        setTotalPrice(0);
        setTotalTickets(0);
        setWarning("");
        alert(res.data.Response);
      })
      .catch((error) => {
        alert(error.response.data.details);
      });
  };

  const handleQuantityChange = (type, delta) => {
    if (ticketAvailibility === 0 && delta > 0) {
      alert("No tickets available for the selected date.");
      return;
    }

    if (delta > 0 && totalTickets >= recievedTicketAvailibility) {
      alert("You cannot add more tickets than are available.");
      return;
    }

    switch (type) {
      case "child":
        setChildQuantity((prev) => Math.max(prev + delta, 0));
        break;
      case "adult":
        setAdultQuantity((prev) => Math.max(prev + delta, 0));
        break;
      case "senior":
        setSeniorQuantity((prev) => Math.max(prev + delta, 0));
        break;
      default:
        break;
    }

    setTicketAvailibility((prev) => Math.max(prev - delta, 0));
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
              onClick={() => handleQuantityChange("child", 1)}
            >
              +
            </button>
            <button
              type="button"
              disabled={childQuantity == 0}
              onClick={() => handleQuantityChange("child", -1)}
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
              onClick={() => handleQuantityChange("adult", 1)}
            >
              +
            </button>
            <button
              type="button"
              disabled={adultQuantity == 0}
              onClick={() => handleQuantityChange("adult", -1)}
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
              onClick={() => handleQuantityChange("senior", 1)}
            >
              +
            </button>
            <button
              type="button"
              disabled={seniorQuantity == 0}
              onClick={() => handleQuantityChange("senior", -1)}
            >
              -
            </button>
          </div>

          <div className="ticket-date-container">
            <label htmlFor="">Plan your Visit</label>
            <select
              required
              onChange={(e) =>
                setVisitDate({ ...visitDate, date: e.target.value })
              }
            >
              <option disabled selected value="">
                Plan your visit
              </option>
              {parkDays.map((day) => (
                <option value={day.Date} key={day.Date}>
                  {day.Date}
                </option>
              ))}
            </select>
          </div>

          <div className="cart-summary">
            <p>
              <strong>Ticket Availability: </strong>
              {ticketAvailibility > 0 ? ticketAvailibility : "Sold Out"}
            </p>
            <p>Total Tickets: {totalTickets}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>

          {warning && <p className="warning">{warning}</p>}

          <button disabled={ticketAvailibility === 0} type="submit">
            Purchase
          </button>
        </form>
      </div>
    </>
  );
};

export default TicketForm;
