import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./Classes.style";
import { RootState } from "../../store/store";
import ClassCard from "../../components/ClassCard/ClassCard";
import { useStudentsHook } from "../../hooks/useStudents.hook";
import { IClassroom } from "../../interfaces/classroom.interface";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";

const Classes = () => {
  const classes = useStyles();

  const { fetchAllClassrooms } = useClassroomsHook();

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  const { fetchAllStudents } = useStudentsHook();

  useEffect(() => {
    fetchAllStudents();
  }, []);
  
  const classState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );  

  const ClassCardElements = classState.map((classroom) => {
    return (
      <ClassCard
        key={classroom.id}
        classId={classroom.id}
        className={classroom.name}
        seatsLeft={classroom.maxOccupancy - classroom.students.length}
        totalSeats={classroom.maxOccupancy}
        studentsList={classroom.students}
      />
    );
  });

  return <div className={classes.classesPage}>
    {ClassCardElements}
  </div>;
};

export default Classes;
