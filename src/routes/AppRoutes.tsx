import Navbar from "../components/Navbar/Navbar";
import { APP_ROUTES } from "../constants/routes.const";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {APP_ROUTES.map(({ route, element }) => (
          <Route key={route} path={route} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
