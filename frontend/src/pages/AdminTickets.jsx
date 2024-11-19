import axios from "axios";
import AdminHeader from "../components/adminHeader";
import { useEffect, useState } from "react";
import TicketCard from "../components/ticketCard";
import "./adminTickets.css";

export default function AdminTickets() {
  const [visitList, setVisitList] = useState([]);
  const [ticketAvailibility, setTicketAvailibility] = useState([]);
  const [parkDays, setParkDays] = useState([]);
  const [parkDayFilter, setParkDayFilter] = useState({});
  const getTickets = () => {
    axios
      .post(
        "https://themepark-backend.onrender.com/adminTickets/customer-visit",
        parkDayFilter
      )
      .then((res) => setVisitList(res.data.Result))
      .catch((err) => alert(err));
  };
  const getCustomerTicketDetails = (e) => {
    e.preventDefault();
    const customerTicketData = {
      customerID: e.target.parentNode.dataset.id,
      ticketType: e.target.parentNode.dataset.tickettype,
    };
    console.log(customerTicketData);
    axios
      .post(
        "https://themepark-backend.onrender.com/adminTickets/customer",
        customerTicketData
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const getTicketAvailibility = () => {
    axios
      .get("https://themepark-backend.onrender.com/adminTickets/availibility", {
        params: parkDayFilter,
      })
      .then((res) => setTicketAvailibility(res.data.Response))
      .catch((err) => alert(err));
  };
  const getVisitDays = () => {
    axios
      .get("https://themepark-backend.onrender.com/adminTickets/days")
      .then((res) => setParkDays(res.data.Response))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTickets();
    getTicketAvailibility();
    getVisitDays();
  }, [parkDayFilter]);
  return (
    <>
      <AdminHeader />
      <section>
        <div className="ticket-report-container">
          <h1>Ticket Availabilty</h1>
          <div>
            <label htmlFor="operatingDay">Operating Day</label>
            <select
              name=""
              id="operatingDay"
              onChange={(e) =>
                setParkDayFilter({ ...parkDayFilter, date: e.target.value })
              }
            >
              <option value="" disabled selected>
                Choose Park Operating Day
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
          <table>
            <tr>
              <th>Date</th>
              <th>Capacity</th>
              <th>Visits</th>
              <th>Tickets</th>
            </tr>
            {ticketAvailibility &&
              parkDayFilter &&
              ticketAvailibility.map((day) => {
                return (
                  <>
                    <tr>
                      <td>{day.Date}</td>
                      <td>{day.TotalCapacity}</td>
                      <td>{day.TotalVisits}</td>
                      <td>{day.RemainingCapacity}</td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
        <div className="ticket-card-container">
          {visitList &&
            visitList.map((visit, key) => {
              return (
                <>
                  <TicketCard
                    customerID={visit.CustomerID}
                    Fname={visit.Fname}
                    ticketType={visit.ticketTypeName}
                    ticketCount={visit.ticketTypeCount}
                    startDate={new Date(
                      visit.ticketStartDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    key={key}
                  />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
}
