import "./app.css";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const buttonColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );

  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      primary: {
        main: buttonColor,
      },
    },
    typography: {
      fontFamily: "Heebo",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="appDiv">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
