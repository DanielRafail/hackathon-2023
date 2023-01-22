import styled from "styled-components";
import Widget from "../Widget";
import CalendarEvent, { CalendarEventType } from "./CalendarEvent";
import Header from "../Header";
import { createRef, useEffect, useState } from "react";
import LoadingAnim from "../LoadingAnim";

type IProps = {};

function Calendar(props: IProps) {
  const {} = props;
  const [events, setEvents] =
    useState<CalendarEventType[]>(calendarInformation);
  const container = createRef();

  const Scroll = (previousHeight: number) => {
    const instance = container.current as any;
    let height: number = instance.scrollTop + 1;
    instance.scrollTop = height;

    if (instance.scrollTop == previousHeight && previousHeight >= 1) {
      instance.scrollTop = 0;
    }

    setTimeout(() => Scroll(instance.scrollTop), 200);
  };

  useEffect(() => {
    setTimeout(() => Scroll(-100), 150);
  }, [container]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <Container>
      <Header>Upcoming Events</Header>
      {loading ? (
        <Center>
          <LoadingAnim />
        </Center>
      ) : (
        <EventsContainer ref={container as any}>
          <Events>
            {events.map((x: CalendarEventType) => (
              <CalendarEvent key={`${x.day}-${x.month}-${x.title}`} {...x} />
            ))}
          </Events>
        </EventsContainer>
      )}
    </Container>
  );
}

const Center = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled(Widget)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 15px;
`;

const EventsContainer = styled.div`
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.calendar.events.colour.background};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Events = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const calendarInformation: CalendarEventType[] = [
  {
    day: "25",
    month: "Jan",
    title: "Flutter Forward",
    time: "5:30pm",
    information: "See how Flutter is pushing UI development forward.",
    location: "Virtual | Nairobi, Kenya",
    type: "development",
  },
  {
    day: "31",
    month: "Jan",
    title: "Google for Startups Accelerator Japan",
    time: "9:00 am",
    information: "Google Accelerator program in Japan - Class 5",
    location: "Tokyo, Japan",
    type: "entrepreneur",
  },
  {
    day: "01",
    month: "Feb",
    title: "Google for Startups Accelerator Canada",
    time: "9:00 am",
    information: "Join the fourth cohort of high-potential Canadian startups in a 10-week program.",
    location: "Virtual",
    type: "entrepreneur",
  },
  {
    day: "02",
    month: "Feb",
    title: "Android Day 2023 on Google Open Source Live",
    time: "12:00 pm",
    information: "Join to learn about Linux Kernal in AOSP (GKI, ACK, and ABI)",
    location: "Virtual",
    type: "development",
  },
  {
    day: "12",
    month: "Feb",
    title: "Kick Start",
    time: "9:00 am",
    information: "Kick Start is a global online coding competition",
    location: "Virtual | San Francisco",
    type: "development",
  },
  {
    day: "16",
    month: "Feb",
    title: "5@7 Montreal",
    time: "5:00 pm",
    information: "Relax and enjoy at our 5@7, open to all!",
    location: "Google offices, Montreal",
    type: "social",
  },
];

export default Calendar;
