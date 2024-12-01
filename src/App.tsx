import "./app.css";
import AppRoutes from "./routes/AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material";
import { useThemeColor } from "./context/ThemeColorContext/ThemeColorContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  const { themeColor } = useThemeColor();

  const theme = createTheme({
    palette: {
      primary: {
        main: themeColor,
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
