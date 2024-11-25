import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { useStyles } from "./ClassCard.style";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { IStudent } from "../../interfaces/student.interface";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";
import StudentsListPopup from "../StudentsListPopup/StudentsListPopup";

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
    try {
      await deleteClass(classId, studentsList);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };


  const classes = useStyles();

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
