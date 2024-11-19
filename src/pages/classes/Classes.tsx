import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./Classes.style";
import { RootState } from "../../store/store";
import useClassrooms from "../../hooks/useClassrooms.hook";
import ClassCard from "../../components/ClassCard/ClassCard";
import { IClassroom } from "../../interfaces/classroom.interface";

const Classes = () => {
  const classes = useStyles();

  const classState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const { data: classrooms, error, isLoading } = useClassrooms();

  useEffect(() => {
    console.log("classrooms ", classrooms);

    console.log("classstate ", classState);
  }, [classrooms, classState]);

  if (isLoading) return <p>Loading classrooms...</p>;
  if (error instanceof Error)
    return <p>Error loading classrooms: {error.message}</p>;

  const ClassCardElements = classState.map((classroom) => {
    return (
      <ClassCard
        key={classroom.id}
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
