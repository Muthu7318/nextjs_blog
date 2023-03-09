import React, { Fragment } from "react";
import { getAllEvents } from "../../helper/api-util";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";

function AllEventsPage({ events }) {
  const router = useRouter();
  const handleSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={handleSearch}></EventsSearch>
      <EventList events={events}></EventList>
    </Fragment>
  );
}
export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;
