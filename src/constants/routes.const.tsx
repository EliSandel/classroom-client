import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/Students";

export const APP_ROUTES = [
  { text: "Classes", route: "/", element: <Classes /> },
  { text: "Students", route: "/students", element: <Students /> },
  { text: "Create", route: "/create", element: <Create /> },
];
