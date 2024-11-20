import { useQuery } from "react-query";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../redux/studentsSlice";
import { fetchStudents } from "../services/students.service";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";

export const useStudentsHook = () => {
  const dispatch = useDispatch();

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );

  const classroomsState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  )

  const queryResults = useQuery({
    queryKey: ["classrooms"],
    queryFn: fetchStudents,
    enabled: studentsState.length === 0,
    onSuccess: (data) => {
      if (data) {
        dispatch(setStudents(data));
      }
    },
  });

  return { 
    getAllStudents: () => queryResults,  
  };
};
