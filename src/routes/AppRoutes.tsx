import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/Students";
import Navbar from "../components/Navbar/Navbar";
import SideDrawer from "../components/SideDrawer/SideDrawer";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
