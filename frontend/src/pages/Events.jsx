import Header from "../components/header";
import EventSection from "../components/eventSection";
import eventImage from "../assets/images/placeholder-image.webp";
import "./events.css";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './DataEntryForm.css';

export default function Events() {
  const [eventList, setEventList] = useState([]);
  const getEvents = () => {
    axios
      .get("http://localhost:3000/events/read")
      .then((res) => setEventList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
  };

  return (
    <>
      <Header />
      <div className="hero">
        <h1>Special Events</h1>
      </div>
      {eventList.map((event, index) => (
      <EventSection
        key={index}
        eventName={event.eventName}
        eventStart={formatDate(event.startDate)}
        eventEnd={formatDate(event.endDate)}
        eventDescription={event.eventType}
        eventImage={eventImage}
      />
      ))}
    </>
  );
}
