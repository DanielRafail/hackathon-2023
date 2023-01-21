import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./styling/Theme";
import Calendar from "./components/Calendar/Calendar";
import SocialMedia from "./components/SocialMediaPost/SocialMeadia";

function Dashboard() {
  return (
    <ThemeProvider theme={Theme}>
      <MainPage>
        {/* <Calendar/> */}
        <SocialMedia/>
      </MainPage>
    </ThemeProvider>
  );
}

const MainPage = styled.div`
  background: ${(props) => props.theme.main.colour.background};
  height: 100vh;
  width: 100vw;
`

export default Dashboard;
