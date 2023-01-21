import styled from "styled-components";
import Widget from "../Widget";
import CalendarEvent from "./CalendarEvent";
import Header from "../Header";

type IProps = {

}

function Calendar(props: IProps) {
    const {  } = props;

    return (
        <Container>
            <Header>Upcoming Events</Header>
            <Events>
                {
                    calendarInformation.map(x => <CalendarEvent key={`${x.day}-${x.month}-${x.title}`} {...x}/>)
                }
            </Events>
        </Container>
    );
}

const Container = styled(Widget)`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 600px;   
    padding: 15px 20px;
    width: 500px;
`

const Events = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
`

const calendarInformation = [
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
    }
];

export default Calendar;
