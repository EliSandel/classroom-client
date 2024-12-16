import React, { useState } from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { useStyles } from "./StudentsTable.style";
import { useAppSelector } from "../../../../store/store";
import TableContainer from "@mui/material/TableContainer";
import { STUDENT_TABLE_HEADERS } from "./StudentsTable.data";
import useStudentsHook from "../../../../hooks/students.hook";
import ClassesListPopup from "../ClassesListPopup/ClassesListPopup";


//index files 
//destructure imports

const StudentsTable: React.FC = () => {
  const classes = useStyles();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const studentsState = useAppSelector((state) => state.students.students);
  const classroomsState = useAppSelector(
    (state) => state.classrooms.classrooms
  );

  const { deleteStudent } = useStudentsHook();

  const handleAssignToClassClick = (studentId: string): void => {
    setSelectedStudentId(studentId);
    setIsDialogOpen(true);
  };

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setSelectedStudentId("");
  };

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="Students table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              {STUDENT_TABLE_HEADERS.map((columnHeader) => (
                <TableCell key={columnHeader}> {columnHeader} </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* remove destructuring. and map and create tablecell */}
            {studentsState?.map(
              ({ id, firstName, lastName, age, profession, classroomId }) => (
                <TableRow key={id} className={classes.tableRow}> 
  
                  <TableCell>{id}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>{profession}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleAssignToClassClick(id)}
                      disabled={!!classroomId}
                    >
                      Assign To Class
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={async () => deleteStudent(id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {classroomsState && (
        <ClassesListPopup
          open={isDialogOpen}
          onClose={handleClose}
          classesList={classroomsState}
          studentId={selectedStudentId}
        />
      )}
    </Box>
  );
};

export default StudentsTable;
