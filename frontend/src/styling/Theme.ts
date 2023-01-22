import { DefaultTheme } from "styled-components";

export const Theme: DefaultTheme = {
  main: {
    colour: {
      background: "#31353f",
    },
  },
  widget: {
    colour: {
      background: "#1b2028d9",
      mainText: "#fff",
      subText: "#b9b9b9",
      subSubText: "#838689",
    },
  },
  calendar: {
    events: {
      colour: {
        background: "#31353f",
        financial: "#9ABF97",
        deadline: "#CF6363",
        social: "#73ADBF",
      },
    },
  },
  jira: {
    project: {
      colour: {
        good: "#9ABF97",
        warning: "#D99157",
        alert: "#CF6363",
      },
    },
  },
};
