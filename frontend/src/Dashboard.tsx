import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./styling/Theme";
import Calendar from "./components/Calendar/Calendar";
import SocialMedia from "./components/SocialMediaPost/SocialMeadia";
import WorkMessages from "./components/WorkChat/WorkMessages";

function Dashboard() {
  return (
    <ThemeProvider theme={Theme}>
      <MainPage>
        <Calendar/>
        <SocialMedia/>
        <WorkMessages/>
      </MainPage>
    </ThemeProvider>
  );
}

const MainPage = styled.div`
  background: ${(props) => props.theme.main.colour.background};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  row-gap: 10px;
  column-gap: 20px;
  padding: 20px;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`

export default Dashboard;
