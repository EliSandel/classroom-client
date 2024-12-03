import "./app.css";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { useThemeColor } from "./context/ThemeColorContext/ThemeColorContext";

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
          <ToastContainer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
