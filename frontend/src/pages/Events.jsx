import Header from "../components/header";
import EventSection from "../components/eventSection";
import eventImage from "../assets/images/placeholder-image.webp";
import "./events.css";

export default function Events() {
  return (
    <>
      <Header />
      <div className="hero">
        <h1>Special Events</h1>
      </div>
      <EventSection
        eventName={"event 1"}
        eventImage={eventImage}
        eventStart={"October 20th"}
        eventEnd={"October 30th"}
        eventDescription={"October fest"}
      />
      <EventSection
        eventName={"Event 2"}
        eventDescription={"face your fears at our haunted park"}
        eventEnd={"october 30th"}
        eventStart={"october 25th"}
        eventImage={eventImage}
      />
    </>
  );
}
