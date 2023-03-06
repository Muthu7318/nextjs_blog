import React from "react";
import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvents}></EventList>
    </div>
  );
}

export default HomePage;
