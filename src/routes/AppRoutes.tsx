import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Navbar from "../components/Navbar/Navbar";
import Students from "../pages/students/Students";
import { useStudentsHook } from "../hooks/useStudents.hook";
import { useClassroomsHook } from "../hooks/useClassrooms.hook";

const AppRoutes: React.FC = () => {
  useClassroomsHook()
  useStudentsHook();

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
