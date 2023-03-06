import React, { Fragment } from "react";
import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const allEvents = getAllEvents();
  const router = useRouter();
  const handleSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={handleSearch}></EventsSearch>
      <EventList events={allEvents}></EventList>
    </Fragment>
  );
}

export default AllEventsPage;
