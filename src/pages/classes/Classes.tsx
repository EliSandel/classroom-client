import { useStyles } from "./Classes.style";
import ClassCard from "./components/ClassCard/ClassCard";
import useFetchClassrooms from "../../hooks/useFetchClassrooms.hook";

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
            seatsLeft={maxOccupancy - students.length}
            totalSeats={maxOccupancy}
            studentsList={students}
          />
        );
      })}
    </div>
  );
};

export default Classes;
