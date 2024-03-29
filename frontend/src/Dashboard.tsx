import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./styling/Theme";
import Calendar from "./components/Calendar/Calendar";
import SocialMedia from "./components/SocialMediaPost/SocialMeadia";
import WorkMessages from "./components/WorkChat/WorkMessages";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Jira from "./components/Jira/Jira";
import ImageViewer from "./components/Images/ImageViewer";
import StarryNight from "./components/StarryNight";
import Logo from "./components/Logo";

function Dashboard() {
  const [socketInstance, setSocketInstance] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    document.title = "Revibing - Google";
    const socket = io("http://127.0.0.1:5000/");
    setSocketInstance(socket);

    //@ts-ignore
    socket.on("connect", (data: any) => {
      console.log("Connected to the socket");
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <MainPage>
        <Logo />
        <SocialMedia socket={socketInstance} />
        <Jira socket={socketInstance} />
        <Calendar />
        <ImageViewer socket={socketInstance} />
        <WorkMessages socket={socketInstance} />
        <StarryNight />
      </MainPage>
    </ThemeProvider>
  );
}

const MainPage = styled.div`
  // background: ${(props) => props.theme.main.colour.background};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: repeat(10, minmax(0, 1fr));
  row-gap: 10px;
  column-gap: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`;

export default Dashboard;
