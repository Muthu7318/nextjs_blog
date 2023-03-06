import React from "react";
import EventItem from "./EventItem";
import styles from "./eventlist.module.css";

function EventList({ events }) {
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem event={event} key={event.id}></EventItem>
      ))}
    </ul>
  );
}

export default EventList;
