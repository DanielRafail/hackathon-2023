import styled from "styled-components";
import Widget from "../Widget";
import CalendarEvent, { CalendarEventType } from "./CalendarEvent";
import Header from "../Header";
import { useState } from "react";

type IProps = {

}

function Calendar(props: IProps) {
    const {  } = props;
    const [events, setEvents] = useState<CalendarEventType[]>(calendarInformation);

    return (
        <Container>
            <Header>Upcoming Events</Header>
            <EventsContainer>
                <Events>
                    {
                        events.map((x: CalendarEventType) => <CalendarEvent key={`${x.day}-${x.month}-${x.title}`} {...x}/>)
                    }
                </Events>
            </EventsContainer>
        </Container>
    );
}

const Container = styled(Widget)`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 100%;
    width: 100%;  
    padding: 15px;
`

const EventsContainer = styled.div`
    overflow-y: auto;

    /* width */
    ::-webkit-scrollbar {
    width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: ${props => props.theme.calendar.events.colour.background}
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`

const Events = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`

const calendarInformation: CalendarEventType[] = [
    {
        day: "06",
        month: "Jan",
        title: "Q1 Financial Report",
        time: "9:30pm",
        information: "Small notes about what is going to happen with the event",
        location: "Montreal, Qc",
        type: "financial"
    },
    {
        day: "20",
        month: "May",
        title: "Jonathan's Birthday Party",
        time: "9:30pm",
        information: "This is the party of the century!!!",
        location: "Montreal, Qc",
        type: "social"
    },
    {
        day: "14",
        month: "Jun",
        title: "Release 3.4",
        time: "all day",
        information: "Release date is current set and ready to go!",
        location: "Montreal, Qc",
        type: "deadline"
    },
    {
        day: "08",
        month: "Jan",
        title: "Q1 Financial Report",
        time: "9:30pm",
        information: "Small notes about what is going to happen with the event",
        location: "Montreal, Qc",
        type: "financial"
    },
    {
        day: "23",
        month: "May",
        title: "Jonathan's Birthday Party",
        time: "9:30pm",
        information: "This is the party of the century!!!",
        location: "Montreal, Qc",
        type: "social"
    },
    {
        day: "24",
        month: "Jun",
        title: "Release 3.4",
        time: "all day",
        information: "Release date is current set and ready to go!",
        location: "Montreal, Qc",
        type: "deadline"
    }
];

export default Calendar;