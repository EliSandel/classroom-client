import { useStyles } from "./Classes.style";
import ClassCard from "./components/ClassCard/ClassCard";
import useFetchClassrooms from "../../hooks/useFetchClassrooms.hook";

const Classes: React.FC = () => {
  const classes = useStyles();

  const classrooms = useFetchClassrooms();

  return (
    <div className={classes.classesPage}>
      {classrooms?.map((classroom) => {
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
      })}
    </div>
  );
};

export default Classes;
