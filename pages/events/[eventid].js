import React, { Fragment } from "react";
import { useRouter } from "next/router";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helper/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

function ASingleEvent({ event }) {
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

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const pathArr = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: pathArr,
    fallback: "blocking",
  };
}

export default ASingleEvent;
