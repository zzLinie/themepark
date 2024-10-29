import Header from "../components/header";
import EventSection from "../components/eventSection";
import eventImage from "../assets/images/placeholder-image.webp";
import anniversaryImage from "../assets/images/anniversary.jpg";
import halloweenImage from "../assets/images/halloween.jpg";
import thanksgivingImage from "../assets/images/thanksgiving.jpg";
import "./events.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataEntryForm.css";

export default function Events() {
  const [eventList, setEventList] = useState([]);
  const getEvents = () => {
    axios
      .get("https://themepark-server.vercel.app/events/read")
      .then((res) => setEventList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const getEventImage = (eventID) => {
    switch (eventID) {
      case 212:
        return halloweenImage;
      case 216:
        return anniversaryImage;
      case 213:
        return thanksgivingImage;
      default:
        return eventImage;
    }
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
          eventImage={getEventImage(event.eventID)}
        />
      ))}
    </>
  );
}
