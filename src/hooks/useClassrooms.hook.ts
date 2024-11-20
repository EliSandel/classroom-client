import { useQuery } from "react-query";
import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { fetchClassrooms, removeStudentFromClassroom } from "../services/classroom.service";

export const useGetAllClassrooms = () => {
  const dispatch = useDispatch();

  const classState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["classrooms"],
    queryFn: fetchClassrooms,
    enabled: classState.length === 0,
    onSuccess: (data) => {
      if (data) {
        dispatch(setClassrooms(data));
      }
    },
  });
  return { data, error, isLoading };
};

export const useRemoveStudentFromClassroom = (): ((
  classroomId: string,
  studentId: string
) => Promise<void>) => {
  const dispatch = useDispatch();
  const classrooms = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  const students = useSelector((state: RootState) => state.students.students);

  const removeStudent = async (classroomId: string, studentId: string) => {
    const updatedClassrooms = classrooms.map((classroom: IClassroom) => {
      if (classroom.id === classroomId) {
        return {
          ...classroom,
          students: classroom.students.filter(
            (student) => student.id !== studentId
          ),
        };
      }
      return classroom;
    });

    const updatedStudents = students.map((student: IStudent) => {
      if (student.id === studentId) {
        return {
          ...student,
          classroomId: null,
        };
      }
      return student;
    });

    dispatch(setClassrooms(updatedClassrooms));
    dispatch(setStudents(updatedStudents));

    await removeStudentFromClassroom(classroomId, studentId);
  };

  return removeStudent;
};
