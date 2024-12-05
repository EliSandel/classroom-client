import "./styles/app.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import createCustomTheme from "./styles/theme";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { useThemeColor } from "./context/ThemeColorContext/ThemeColorContext";

const queryClient = new QueryClient();

const App = () => {
  const { themeColor } = useThemeColor();

  const theme = createCustomTheme(themeColor);

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
