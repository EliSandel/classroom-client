import { createTheme } from "@mui/material";

const createCustomTheme = (themeColor: string) => 
  createTheme({
    palette: {
      primary: {
        main: themeColor,
      },
    },
    typography: {
      fontFamily: "Heebo",
    },
  });

export default createCustomTheme;
