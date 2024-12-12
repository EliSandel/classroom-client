import {
  List,
  Avatar,
  Dialog,
  ListItem,
  IconButton,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { useStyles } from "./StudentsListPopup.style";
import useClassroomsHook from "../../../../hooks/classrooms.hook";
import { IStudent } from "../../../../interfaces/student.interface";

export interface IStudentsListPopupProps {
  open: boolean;
  onClose: () => void;
  studentsList: IStudent[];
}

const StudentsListPopup: React.FC<IStudentsListPopupProps> = ({
  open,
  onClose,
  studentsList,
}: IStudentsListPopupProps) => {
  const { removeStudentFromClassroom } = useClassroomsHook();

  const classes = useStyles();

  //remove click from function name
  const handleRemoveStudentFromClassClick = async (
    classroomId: string | null,
    studentId: string
  ): Promise<void> => {
    if (classroomId) {
      await removeStudentFromClassroom(classroomId, studentId);
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        {studentsList.length !== 0 ? "Students List" : "This class is empty"}
      </DialogTitle>
      <List className={classes.listDiv}>
        {studentsList.map(({ id, firstName, lastName, classroomId }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={firstName + " " + lastName} />
            <IconButton
              onClick={async () =>
                await handleRemoveStudentFromClassClick(classroomId, id)
              }
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default StudentsListPopup;
