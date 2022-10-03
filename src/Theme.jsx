import React from "react";
import { ThemeProvider as TProvider } from "styled-components";

const theme = {
  colors: {
    main: "#ff4500",
    main_lighter: "#ff6a33",
    main_darker: "#cc3700",
    secondary: "#bfe8d8",
  },
  //   fonts: ["sans-serif", "Roboto"],
  //   fontSizes: {
  //     small: "1em",
  //     medium: "2em",
  //     large: "3em"
  //   }
};

const ThemeProvider = ({ children }) => (
  <TProvider theme={theme}>{children}</TProvider>
);

export default ThemeProvider;
