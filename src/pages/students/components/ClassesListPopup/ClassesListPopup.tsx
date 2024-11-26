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
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import { useStudentsHook } from "../../../../hooks/useStudents.hook";
import { IClassroom } from "../../../../interfaces/classroom.interface";

interface SimpleDialogProps {
  open: boolean;
  studentId: string;
  onClose: () => void;
  classesList: IClassroom[];
}

const ClassesListPopup = ({
  open,
  studentId,
  onClose,
  classesList,
}: SimpleDialogProps) => {
  const { addStudentToClass } = useStudentsHook();

  const handleAddStudentToClassClick = async (classId: string) => {
    await addStudentToClass(classId, studentId);
    onClose();
  };

  const availableClasses: IClassroom[] = classesList.filter(
    (classroom: IClassroom) =>
      classroom.students.length < classroom.maxOccupancy
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Available Classes</DialogTitle>
      <List sx={{ pt: 0 }}>
        {availableClasses.map((classroom, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={classroom.name} />
            <IconButton
              onClick={async () => handleAddStudentToClassClick(classroom.id)}
            >
              <AddIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default ClassesListPopup;
