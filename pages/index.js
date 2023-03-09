import React from "react";
import { getFeaturedEvents } from "../helper/api-util";
import EventList from "@/components/events/EventList";

function HomePage({ featuredEvents }) {
  return (
    <div>
      <EventList events={featuredEvents}></EventList>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 10,
  };
}

export default HomePage;
