import React, { useState } from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { useStyles } from "./StudentsTable.style";
import TableContainer from "@mui/material/TableContainer";
import useStudentsHook from "../../../../hooks/useStudents.hook";
import ClassesListPopup from "../ClassesListPopup/ClassesListPopup";
import useFetchStudents from "../../../../hooks/useFetchStudents.hook";
import useFetchClassrooms from "../../../../hooks/useFetchClassrooms.hook";

const StudentsTable: React.FC = () => {
  const classes = useStyles();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const studentsState = useFetchStudents();
  const classesState = useFetchClassrooms();

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
            {studentsState?.map(
              ({ id, firstName, lastName, age, profession, classroomId }) => (
                <TableRow key={id}>
                  <TableCell className={classes.alignCenter}>{id}</TableCell>
                  <TableCell className={classes.alignCenter}>
                    {firstName}
                  </TableCell>
                  <TableCell className={classes.alignCenter}>
                    {lastName}
                  </TableCell>
                  <TableCell className={classes.alignCenter}>{age}</TableCell>
                  <TableCell className={classes.alignCenter}>
                    {profession}
                  </TableCell>
                  <TableCell className={classes.alignCenter}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAssignToClassClick(id)}
                      disabled={classroomId !== null}
                    >
                      Assign To Class
                    </Button>
                  </TableCell>
                  <TableCell className={classes.alignCenter}>
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
      {classesState && (
        <ClassesListPopup
          open={isDialogOpen}
          onClose={handleClose}
          classesList={classesState}
          studentId={selectedStudentId}
        />
      )}
    </Box>
  );
};

export default StudentsTable;
