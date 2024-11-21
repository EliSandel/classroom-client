import {
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { IStudent } from "../../interfaces/student.interface";
import { useClassroomsHook } from "../../hooks/useClassrooms.hook";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  studentsList: IStudent[];
}

function StudentsListPopup({ open, onClose, studentsList }: SimpleDialogProps) {
  const { removeStudentFromClassroom } = useClassroomsHook();

  const handleRemoveStudentFromClassClick = async (
    classroomId: string,
    studentId: string
  ) => {
    await removeStudentFromClassroom(classroomId, studentId);
  };
  
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{studentsList.length !== 0 ? "Students List" : "This class is empty"}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {studentsList.map((student, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={student.firstName + " " + student.lastName}
            />
            <IconButton
              onClick={async () =>
                await handleRemoveStudentFromClassClick(
                  student.classroomId,
                  student.id
                )
              }
            >
              <DeleteIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default StudentsListPopup;
