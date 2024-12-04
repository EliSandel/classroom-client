import { useStyles } from "./Classrooms.style";
import ClassCard from "./components/ClassroomCard/ClassroomCard";
import useFetchClassrooms from "../../hooks/fetch-classrooms.hook";

const Classes: React.FC = () => {
  const classes = useStyles();

  const classrooms = useFetchClassrooms();

  return (
    <div className={classes.classesPage}>
      {classrooms?.map(({ id, name, maxOccupancy, students }) => {
        return (
          <ClassCard
            key={id}
            classId={id}
            className={name}
            studentsList={students}
            totalSeats={maxOccupancy}
            seatsLeft={maxOccupancy - students.length}
          />
        );
      })}
    </div>
  );
};

export default Classes;
