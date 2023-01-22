import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import { useEffect, useState } from "react";
import Project, { IMilestone } from "./Project";
import LoadingAnim from "../LoadingAnim";

export type IProject = {
  key: string;
  name: string;
  avatarUrls: Object;
  milestones: IMilestone[];
};

type IProps = {
  socket: any;
};

function Jira(props: IProps) {
  const { socket } = props;
  const [loading, setLoading] = useState<boolean>(true);

  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("Milestones", (data: string[]) => {
        fetch("http://127.0.0.1:5000/" + "api/milestone")
          .then((res) => res.json())
          .then((result) => {
            setProjects(result ? result : []);
          })
          .catch(console.error);
      });
    }
  }, [socket]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/" + "api/milestone")
      .then((res) => res.json())
      .then((result) => {
        setProjects(result ? result : []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Container>
      <Header>Milestones</Header>
      {loading ? (
        <Center>
          <LoadingAnim />
        </Center>
      ) : (
        <ProjectContainer>
          <Projects>
            {projects.map((p) =>
              p?.milestones.map((x) => (
                <Project
                  key={x.id}
                  name={p.key}
                  avatarUrls={p.avatarUrls}
                  milestone={x}
                />
              ))
            )}
          </Projects>
        </ProjectContainer>
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
  grid-row: 1 / 6;
`;

const ProjectContainer = styled.div`
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
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

  padding: 10px 10px;
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const mockProjects = [
  {
    projectName: "Release 1",
    itemsCompleted: 14,
    totalItems: 100,
    endDate: "2023-01-29",
    status: "alert",
  },
  {
    projectName: "Release 3",
    itemsCompleted: 90,
    totalItems: 100,
    endDate: "2023-08-29",
    status: "warning",
  },
  {
    projectName: "Release 2",
    itemsCompleted: 40,
    totalItems: 100,
    endDate: "2024-01-29",
    status: "good",
  },
];

export default Jira;
