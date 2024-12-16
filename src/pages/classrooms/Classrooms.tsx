import { useStyles } from "./Classrooms.style";
import { useAppSelector } from "../../store/store";
import ClassCard from "./components/ClassroomCard/ClassroomCard";

const Classes: React.FC = () => {
  const classes = useStyles();
  const classroomsState = useAppSelector(
    (state) => state.classrooms.classrooms
  );

  return (
    <div className={classes.classesPage}>
      {classroomsState?.map(({ id, name, maxOccupancy, students }) => {
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
