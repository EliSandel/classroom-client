import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStudentToClassService, fetchStudentsService } from "../services/students.service";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { useQueryClient } from "react-query";
import { setClassrooms } from "../redux/classroomsSlice";

export const useStudentsHook = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const studentsState: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );

  const classroomsState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const fetchAllStudents = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["students"],
      queryFn: fetchStudentsService,
    });

    if (data) {
      dispatch(setStudents(data));
    }

    return data;
  };

  // when i create the list of classes popup. i will need to map over the classes. and if a class is full then dont render the +
  const addStudentToClass = async (classId: string, studentId: string) => {

    const updatedClassrooms = classroomsState.map((classroom) => {
      if (classroom.id === classId) {
        // Remove the studentId from the classroom's students array
        return {
          ...classroom,
          students: classroom.students.filter((student) => {
            return student.id !== studentId;
          }),
        };
      }
      return classroom; // Return other classrooms unchanged
    });

    const updatedStudents = studentsState.map((student) => {
      if (student.id === studentId) {
        // Change the student's classroomId to null
        return {
          ...student,
          classroomId: null,
        };
      }
      return student; // Return other students unchanged
    });

    dispatch(setClassrooms(updatedClassrooms));
    dispatch(setStudents(updatedStudents));
    console.log(updatedClassrooms);

    const response = await addStudentToClassService(classId, studentId);
    return response;

  };

  return {
    fetchAllStudents,
    addStudentToClass,
  };
};
