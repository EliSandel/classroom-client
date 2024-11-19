import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/Students";
import Navbar from "../components/Navbar/Navbar";
import useClassrooms from "../hooks/useClassrooms.hook";
import useStudents from "../hooks/useStudents.hook";

const AppRoutes: React.FC = () => {
  useClassrooms();
  useStudents();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
