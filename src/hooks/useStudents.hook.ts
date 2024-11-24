import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentToClassService,
  fetchStudentsService,
} from "../services/students.service";
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

  const addStudentToClass = async (classId: string, studentId: string) => {
    const studentToAdd = studentsState.find(
      (student) => student.id === studentId
    );

    if (!studentToAdd) {
      throw new Error("Student not found");
    }

    const updatedStudentToAdd: IStudent = {
      ...studentToAdd,
      classroomId: classId,
    };

    const updatedClassrooms = classroomsState.map((classroom) => {
      if (classroom.id === classId) {
        return {
          ...classroom,
          students: [...classroom.students, updatedStudentToAdd],
        };
      }
      return classroom;
    });

    const updatedStudents = studentsState.map((student) => {
      if (student.id === studentId) {
        return updatedStudentToAdd;
      }
      return student;
    });

    dispatch(setStudents(updatedStudents));
    dispatch(setClassrooms(updatedClassrooms));

    const response = await addStudentToClassService(classId, studentId);
    return response;
  };

  return {
    fetchAllStudents,
    addStudentToClass,
  };
};
