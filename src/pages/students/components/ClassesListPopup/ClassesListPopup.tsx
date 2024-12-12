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
import { useStyles } from "./ClassesListPopup.style";
import useStudentsHook from "../../../../hooks/students.hook";
import { IClassroom } from "../../../../interfaces/classroom.interface";

interface ISimpleDialogProps {
  open: boolean;
  studentId: string;
  onClose: () => void;
  classesList: IClassroom[];
}

const ClassesListPopup: React.FC<ISimpleDialogProps> = ({
  open,
  studentId,
  onClose,
  classesList,
}: ISimpleDialogProps) => {
  const { addStudentToClass } = useStudentsHook();

  const classes = useStyles();

  const handleAddStudentToClassClick = async (//move to students table and pass as props. optional
    classId: string
  ): Promise<void> => {
    await addStudentToClass(classId, studentId);
    onClose();
  };

  //usememo
  const availableClasses: IClassroom[] = classesList.filter(
    (classroom) => classroom.students.length < classroom.maxOccupancy
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Available Classes</DialogTitle>
      <List className={classes.listDiv}>
        {availableClasses.map(({ id, name }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            {/* added await */}
            <IconButton onClick={async () => await handleAddStudentToClassClick(id)}>
              <AddIcon color="primary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default ClassesListPopup;
