import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsService } from "../services/students.service";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { useQueryClient } from "react-query";


export const useStudentsHook = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );

  const classroomsState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  )

  const fetchAllStudents = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["classrooms"],
      queryFn: fetchStudentsService,
    });

    if (data) {
      dispatch(setStudents(data));
    }

    return data;
  };

  return { 
    fetchAllStudents,  
  };
};
