import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./Dashboard.css";
import EmployeeHeader from "../components/employeeHeader";

const Dashboard = () => {
    const [topRides, setTopRides] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [upcomingMaintenance, setUpcomingMaintenance] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayEvents, setDayEvents] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch top 5 popular rides
        const fetchTopRides = async () => {
            try {
                const response = await axios.get("https://gleaming-lokum-158537.netlify.app/rides/top-rides");
                setTopRides(response.data);
            } catch (error) {
                console.error("Error fetching top rides:", error);
            }
        };

        // Fetch top 5 upcoming events
        const fetchUpcomingEvents = async () => {
            try {
                const response = await axios.get("https://gleaming-lokum-158537.netlify.app/events/upcoming-events");
                setUpcomingEvents(response.data);
            } catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        };

        // Fetch top 5 upcoming maintenance
        const fetchUpcomingMaintenance = async () => {
            try {
                const response = await axios.get("https://gleaming-lokum-158537.netlify.app/events/upcoming-maintenance");
                setUpcomingMaintenance(response.data);
            } catch (error) {
                console.error("Error fetching upcoming maintenance:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get("https://gleaming-lokum-158537.netlify.app/events/read");
                setEvents(response.data.result);
            } catch (error) {
                console.error("Error fetching upcoming maintenance:", error);
            }
        };

        fetchEvents();
        fetchTopRides();
        fetchUpcomingEvents();
        fetchUpcomingMaintenance();
    }, []);

    // Handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        const filteredEvents = events.filter(
            (event) => event.startDate.split("T")[0] === formattedDate
        );
        setDayEvents(filteredEvents);
    };

    // Add custom styles for dates with events
    const tileContent = ({ date, view }) => {
        if (view === "month") {
            const formattedDate = date.toISOString().split("T")[0];
            const hasEvent = events.some(
                (event) => event.startDate.split("T")[0] === formattedDate
            );
            return hasEvent ? <div className="event-dot"></div> : null;
        }
    };

    return (
        <>
        <EmployeeHeader />
        <div className="dashboard-container">
            <div className="dashboard-row">
                {/* Top Rides */}
                <div className="dashboard-card">
                    <h2>Top 5 Popular Rides</h2>
                    {topRides.length > 0 ? (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Ride Name</th>
                                    <th>Type</th>
                                    <th>Capacity</th>
                                    <th>Popularity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topRides.map((ride, index) => (
                                    <tr key={index}>
                                        <td>{ride.rideName}</td>
                                        <td>{ride.rideType}</td>
                                        <td>{ride.capacity}</td>
                                        <td>{ride.popularityScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No popular rides found.</p>
                    )}
                </div>

                {/* Upcoming Events */}
                <div className="dashboard-card">
                    <h2>Top 5 Upcoming Events</h2>
                    {upcomingEvents.length > 0 ? (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingEvents.map((event, index) => (
                                    <tr key={index}>
                                        <td>{event.eventName}</td>
                                        <td>{event.eventType}</td>
                                        <td>{new Date(event.startDate).toDateString()}</td>
                                        <td>{new Date(event.endDate).toDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No upcoming events found.</p>
                    )}
                </div>
            </div>
            <div className="dashboard-row">
                {/* Event Calendar */}
                <div className="dashboard-card">
                    <h2>Event Calendar</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileContent={tileContent}
                    />
                    <div className="day-events">
                        <h3>Events on {selectedDate.toDateString()}</h3>
                        {dayEvents.length > 0 ? (
                            <ul>
                                {dayEvents.map((event, index) => (
                                    <li key={index}>
                                        <strong>{event.eventName}</strong> - {event.eventType} <br />
                                        From: {new Date(event.startDate).toDateString()} <br />
                                        To: {new Date(event.endDate).toDateString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No events scheduled for this day.</p>
                        )}
                    </div>
                </div>
                 <div className="dashboard-card">
                    <h2>Top 5 Upcoming Maintenance</h2>
                    {upcomingMaintenance.length > 0 ? (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Ride Name</th>
                                    <th>Technician</th>
                                    <th>Maintenance Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingMaintenance.map((maintenance, index) => (
                                    <tr key={index}>
                                        <td>{maintenance.rideName}</td>
                                        <td>{maintenance.technician}</td>
                                        <td>{new Date(maintenance.maintenanceDate).toDateString()}</td>
                                        <td>{maintenance.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No upcoming maintenance found.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
