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
import { useRemoveStudentFromClassroom } from "../../hooks/useClassrooms.hook";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  studentsList: IStudent[];
}


function StudentsPopup({ open, onClose, studentsList }: SimpleDialogProps) {
  
  // const dispatch = useDispatch();
  // const classrooms = useSelector((state: RootState) => state.classrooms.classrooms);
  // const students = useSelector((state: RootState) => state.students.students);

  // const handleRemoveStudentFromClass = async (classId: string, studentId: string) => {
  //   await removeStudentFromClassroomService(classId, studentId, classrooms, students, dispatch);
  // }
  const removeStudent = useRemoveStudentFromClassroom();

  console.log("rerender");
  

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
              <DeleteIcon color="primary" onClick={async() => removeStudent(student.classroomId, student.id)}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default StudentsPopup;
