import Navbar from "../components/Navbar/Navbar";
import { APP_ROUTES } from "../constants/routes.const";
import useFetchStudents from "../hooks/fetch-students.hook";
import useFetchClassrooms from "../hooks/fetch-classrooms.hook";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  useFetchStudents();
  useFetchClassrooms();

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
