import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import { useState } from "react";
import Project from "./Project";

type IProps = {

}

function Jira(props: IProps) {
    const {  } = props;
    const [epics, setEpics] = useState();

    return (
        <Container>
            <Header>Projects</Header>
            <ProjectContainer>
                <Projects>
                    {projects.map(x => <Project key={x.projectName} {...x}/>)}
                </Projects>
            </ProjectContainer>
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
    grid-row: 1 / 3;
`

const ProjectContainer = styled.div`
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

    padding: 10px 10px;
`

const Projects = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`

const projects = [
    {
        projectName: "Release 1",
        itemsCompleted: 14,
        totalItems: 100,
        endDate: "2023-01-29",
        status: "alert"
    },
    {
        projectName: "Release 3",
        itemsCompleted: 90,
        totalItems: 100,
        endDate: "2023-08-29",
        status: "warning"
    },
    {
        projectName: "Release 2",
        itemsCompleted: 40,
        totalItems: 100,
        endDate: "2024-01-29",
        status: "good"
    },
]

export default Jira;