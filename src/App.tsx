import AppRoutes from "./routes/AppRoutes";
import "./app.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const buttonColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: buttonColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="appDiv">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
