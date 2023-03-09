import { getFilteredEvents } from "../../helper/api-util";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import useSWR from "swr";

function FilteredEventPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://next-js-87706-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
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

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>No Events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const validDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={validDate}></ResultsTitle>
      <EventList events={filteredEvents}></EventList>
    </Fragment>
  );
}

// export async function getServerSideProps({ params }) {
//   const filteredData = params.slug;

//   const year = filteredData[0];
//   const month = filteredData[1];

//   const yearNum = +year;
//   const monthNum = +month;

//   if (
//     isNaN(yearNum) ||
//     isNaN(monthNum) ||
//     yearNum > 2030 ||
//     yearNum < 2021 ||
//     month < 1 ||
//     monthNum > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: yearNum,
//     month: monthNum,
//   });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         yearNum,
//         monthNum,
//       },
//     },
//   };
// }

export default FilteredEventPage;
