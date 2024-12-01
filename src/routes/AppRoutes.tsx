import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Navbar from "../components/Navbar/Navbar";
import Students from "../pages/students/Students";

//maybe move const to const dir
const AppRoutes: React.FC = () => {
  const routes = [
    { path: "/", element: <Classes /> },
    { path: "/students", element: <Students /> },
    { path: "/create", element: <Create /> },
  ];

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
