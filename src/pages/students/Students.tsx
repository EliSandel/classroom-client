import { useEffect } from "react";
import { useStudentsHook } from "../../hooks/useStudents.hook";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";
import StudentsTable from "./components/StudentsTable/StudentsTable";

const StudentsPage = () => {
  
  const { fetchAllStudents } = useStudentsHook();

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const { fetchAllClassrooms } = useClassroomsHook();

  useEffect(() => {
    fetchAllClassrooms();
  }, [])

  return <StudentsTable />;
};

export default StudentsPage;
