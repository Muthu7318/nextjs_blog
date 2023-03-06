import { getFilteredEvents } from "@/dummy-data";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventPage(props) {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const year = filteredData[0];
  const month = filteredData[1];

  const yearNum = +year;
  const monthNum = +month;

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    yearNum < 2021 ||
    month < 1 ||
    monthNum > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>Invalid filter. Please adjust the values</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvent = getFilteredEvents({
    year: yearNum,
    month: monthNum,
  });

  if (!filteredEvent || filteredEvent.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>No Events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(yearNum, monthNum - 1);
  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList events={filteredEvent}></EventList>
    </Fragment>
  );
}

export default FilteredEventPage;
