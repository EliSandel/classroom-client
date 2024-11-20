import { useQuery } from "react-query";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../redux/studentsSlice";
import { getStudents } from "../services/students.service";
import { IStudent } from "../interfaces/student.interface";

const useGetAllStudents = () => {
  const dispatch = useDispatch();

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["students"], 
    queryFn: getStudents, 
    enabled: studentsState.length === 0,
    onSuccess: (data) => {
        if (data) {
            dispatch(setStudents(data));
        }
    }
  });
  return { data, error, isLoading };
};

export default useGetAllStudents;

