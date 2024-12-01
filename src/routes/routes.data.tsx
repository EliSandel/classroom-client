import Create from "../pages/create/Create";
import Classes from "../pages/classes/Classes";
import Students from "../pages/students/Students";

export const APP_ROUTES = [
  { path: "/", element: <Classes /> },
  { path: "/students", element: <Students /> },
  { path: "/create", element: <Create /> },
];
