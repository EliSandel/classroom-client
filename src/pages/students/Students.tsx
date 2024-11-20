import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { IStudent } from '../../interfaces/student.interface';



const StudentsPage = () => {

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Profession</TableCell>
            <TableCell align="right">Assign</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            studentsState.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.profession}</TableCell>
                <TableCell>button</TableCell>
                <TableCell>button</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentsPage
