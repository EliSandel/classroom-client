import { useSelector } from "react-redux";
import { useStyles } from "./Classes.style";
import { RootState } from "../../store/store";
import ClassCard from "../../components/ClassCard/ClassCard";
import { IClassroom } from "../../interfaces/classroom.interface";

const Classes = () => {
  const classes = useStyles();
  
  const classState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  

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
