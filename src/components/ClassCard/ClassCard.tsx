import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useStyles } from "./ClassCard.style";
import { RootState } from "../../store/store";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentsListPopup from "../StudentsListPopup/StudentsListPopup";
import { IStudent } from "../../interfaces/student.interface";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";

interface ClassCardProps {
  classId: string;
  className: string;
  seatsLeft: number;
  totalSeats: number;
  studentsList: IStudent[];
}

const ClassCard = ({
  classId,
  className,
  seatsLeft,
  totalSeats,
  studentsList,
}: ClassCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { deleteClass } = useClassroomsHook();

  const handleStudentsListClick = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteClassClick = async () => {
    const response = await deleteClass(classId, studentsList);
    console.log(response) // add error popup if my response is no.
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const backgroundColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );

  const classes = useStyles({ backgroundColor });

  console.log("card component ", studentsList);

  return (
    <Card className={classes.cardDiv} elevation={0}>
      <CardContent className={classes.cardContentClass}>
        <Typography className={classes.className}>{className}</Typography>
        <Typography className={classes.seatsLeft}>
          There are {seatsLeft} seats left
        </Typography>
        <Typography className={classes.totalSeats}>
          out of {totalSeats}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingRight: "0 !important" }}>
        <Button
          className={classes.studentsListButton}
          onClick={handleStudentsListClick}
        >
          Students List
        </Button>
        <IconButton onClick={handleDeleteClassClick}>
          <DeleteIcon className={classes.trashIcon} color="primary" />
        </IconButton>
      </CardActions>
      <StudentsListPopup
        open={isDialogOpen}
        onClose={handleClose}
        studentsList={studentsList}
      />
    </Card>
  );
};

export default ClassCard;
