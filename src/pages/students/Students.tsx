import React, { useEffect } from "react";
import { useStudentsHook } from "../../hooks/useStudents.hook";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";
import StudentsTable from "./components/StudentsTable/StudentsTable";

const StudentsPage: React.FC = () => {
  const { fetchAllStudents } = useStudentsHook();
  const { fetchAllClassrooms } = useClassroomsHook();

  useEffect(() => {
    fetchAllStudents();
  }, []);

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  return <StudentsTable />;
};

export default StudentsPage;
