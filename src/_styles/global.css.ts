import { createTheme } from "@vanilla-extract/css";

export const [themeClassName, themeVars] = createTheme({
  color: {
    background: "#FFFFFF",
    backgroundLight: "#F3F3F3",
    primary: "#F85018",
    secondary: "#293448",
    border: "#DDDDDD",
    text: "#303A4E",
    disabledText: "#505359",
  },
  radius: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  space: {
    xSmall: "8px",
    small: "12px",
    medium: "16px",
    large: "20px",
    xLarge: "24px",
  },
  animation: {
    duration: {
      fast: "0.2s",
      medium: "0.5s",
      slow: "1s",
    },
  },
  font: {
    size: {
      xSmall: "1.4rem",
      small: "1.6rem",
      medium: "1.8rem",
      large: "2rem",
      xLarge: "2.4rem",
    },
    weight: {
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },
  },
});
