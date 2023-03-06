import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

function ASingleEvent(props) {
  const { query } = useRouter();
  const { eventid } = query;

  const event = getEventById(eventid);

  if (!event) {
    return <ErrorAlert> No Event Found</ErrorAlert>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      ></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default ASingleEvent;
