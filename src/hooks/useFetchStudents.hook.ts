import { useEffect } from "react";
import { RootState } from "../store/store";
import { useQueryClient } from "react-query";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IStudent } from "../interfaces/student.interface";
import { fetchStudentsService } from "../services/students.service";

const useFetchStudents = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const students: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  useEffect(() => {
    if (students) {
      return;
    }

    const fetchAndSetStudents = async () => {
      const data = await queryClient.fetchQuery<IStudent[]>({
        queryKey: ["students"],
        queryFn: fetchStudentsService,
        staleTime: Infinity,
      });

      if (data) {
        dispatch(setStudents(data));
      }
    };

    fetchAndSetStudents();
  }, []);

  return students;
};

export default useFetchStudents;
