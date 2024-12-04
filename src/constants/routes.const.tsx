import Create from "../pages/create/Create";
import Students from "../pages/students/Students";
import Classes from "../pages/classrooms/Classrooms";

export const APP_ROUTES = [
  { text: "Classes", route: "/", element: <Classes /> },
  { text: "Students", route: "/students", element: <Students /> },
  { text: "Create", route: "/create", element: <Create /> },
];
