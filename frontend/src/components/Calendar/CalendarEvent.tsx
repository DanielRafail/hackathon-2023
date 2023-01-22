import styled from "styled-components";

export type CalendarEventType = {
    day: string,
    month: string,
    title: string,
    time: string,
    information: string,
    location: string,
    type: string
}

type EventTypes = "financial" | "social" | "deadline"

function CalendarEvent(props: CalendarEventType) {
    const { day, month, title, time, location, information, type } = props;

    return (
        <Container>
            <DateSquare type={type as EventTypes}>
                <Day>{day}</Day>
                <Month>{month}</Month>
            </DateSquare>
            <Description>
                <div>
                    <Title>{title}</Title>
                    <Info>{information}</Info>
                </div>
                <Details>{time} • {location}</Details>
            </Description>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    column-gap: 15px;
    overflow: hidden;
`

const DateSquare = styled.div<{type: EventTypes}>`
    align-items: center;
    background: ${props => props.theme.calendar.events.colour[props.type]};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 0.85;
    min-height: 75px;
    width: 75px;
`

const Day = styled.div`
    font-size: 30px;
`

const Month = styled.div`
    font-size: 22px;
    font-weight: bold;
`

const Description = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: space-around;
    row-gap: 0px;
    width: calc(100% - 75px - 15px);
`

const Details = styled.div`
    color: ${props => props.theme.widget.colour.subText};
    font-size: 14px;
`

const Info = styled.div`
    color: ${props => props.theme.widget.colour.subSubText};
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const Title = styled.div`
   text-overflow: ellipsis;
   overflow: hidden;
    white-space: nowrap;
`

export default CalendarEvent;
