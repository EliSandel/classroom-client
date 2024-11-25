import "./app.css";
import AppRoutes from "./routes/AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material";
import { useButtonColor } from "./context/ButtonColorContext";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  const { buttonColor } = useButtonColor();

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
