import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { useStyles } from "./StudentsTable.style";
import TableContainer from "@mui/material/TableContainer";
import { IStudent } from "../../interfaces/student.interface";
import ClassesListPopup from "../ClassesListPopup/ClassesListPopup";
import { useState } from "react";
import { IClassroom } from "../../interfaces/classroom.interface";

const StudentsTable = () => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );

  const classesState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const handleAssignToClassClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedStudentId("");
  };

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.alignCenter}>ID</TableCell>
              <TableCell className={classes.alignCenter}>First Name</TableCell>
              <TableCell className={classes.alignCenter}>Last Name</TableCell>
              <TableCell className={classes.alignCenter}>Age</TableCell>
              <TableCell className={classes.alignCenter}>Profession</TableCell>
              <TableCell className={classes.alignCenter}>Assign</TableCell>
              <TableCell className={classes.alignCenter}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsState.map((student) => (
              <TableRow key={student.id}>
                <TableCell className={classes.alignCenter}>
                  {student.id}
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  {student.firstName}
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  {student.lastName}
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  {student.age}
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  {student.profession}
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  <Button
                    variant="outlined"
                    onClick={() => handleAssignToClassClick(student.id)}
                    disabled={student.classroomId !== null}
                  >
                    Assign To Class
                  </Button>
                </TableCell>
                <TableCell className={classes.alignCenter}>
                  <Button variant="outlined">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClassesListPopup
        open={isDialogOpen}
        onClose={handleClose}
        classesList={classesState}
        studentId={selectedStudentId}
      />
    </Box>
  );
};

export default StudentsTable;
