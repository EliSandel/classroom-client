import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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

function StudentsPopup({ open, onClose, studentsList }: SimpleDialogProps) {

  console.log("rerender");
  const { removeStudentFromClassroom } = useClassroomsHook();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Students List</DialogTitle>
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
            <ListItemButton>
              <DeleteIcon
                color="primary"
                onClick={async () =>
                  removeStudentFromClassroom(student.classroomId, student.id)
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default StudentsPopup;
