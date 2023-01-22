import styled from "styled-components";
import Widget from "../Widget";
// import CalendarEvent, { CalendarEventType } from "./CalendarEvent";
import Header from "../Header";
import { useState } from "react";

type IProps = {

}

function Jira(props: IProps) {
    // const {  } = props;
    // const [events, setEvents] = useState<CalendarEventType[]>(calendarInformation);

    // return (
    //     <Container>
    //         <Header>Projects</Header>
    //         <EventsContainer>
    //             <Events>
    //                 {
    //                     events.map((x: CalendarEventType) => <CalendarEvent key={`${x.day}-${x.month}-${x.title}`} {...x}/>)
    //                 }
    //             </Events>
    //         </EventsContainer>
    //     </Container>
    // );
}

const Container = styled(Widget)`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 100%;
    width: 100%;  
    padding: 15px;
    grid-row: 1 / 3;
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

export default Jira;