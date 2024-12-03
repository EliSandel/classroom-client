import { useEffect } from "react";
import { toast } from "react-toastify";
import { RootState } from "../store/store";
import { useQueryClient } from "react-query";
import { setStudents } from "../redux/students.slice";
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
      try {
        const data = await queryClient.fetchQuery<IStudent[]>({
          queryKey: ["students"],
          queryFn: fetchStudentsService,
          staleTime: Infinity,
        });

        if (data) {
          dispatch(setStudents(data));
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to load students. Please try again later.");
      }
    };

    fetchAndSetStudents();
  }, []);

  return students;
};

export default useFetchStudents;
