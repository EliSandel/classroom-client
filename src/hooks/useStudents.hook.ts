import {
  addStudentToClassService,
  createStudentService,
  deleteStudentService,
  fetchStudentsService,
} from "../services/students.service";
import { RootState } from "../store/store";
import { useQueryClient } from "react-query";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { ICreateStudentBody } from "../interfaces/createStudentBody.interface";

export const useStudentsHook = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const studentsState: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  const classroomsState: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const fetchAllStudents = async () => {
    if (studentsState !== null) {
      return
    }
    const data = await queryClient.fetchQuery({
      queryKey: ["students"],
      queryFn: fetchStudentsService,
      staleTime: Infinity,
    });

    if (data) {
      dispatch(setStudents(data));
    }

    return data;
  };

  const addStudentToClass = async (classId: string, studentId: string) => {

    if (classroomsState === null || studentsState === null) {
      throw new Error("This error will never be called. it is just here to fix typescript issues.");
    }

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

  const deleteStudent = async (studentId: string) => {

    if (classroomsState === null || studentsState === null) {
      throw new Error("This error will never be called. it is just here to fix typescript issues.");
    }

    const studentToDelete = studentsState.find(
      (student) => student.id === studentId
    );

    if (!studentToDelete) {
      throw new Error("Student not found");
    }

    if (studentToDelete.classroomId) {
      const updatedClassrooms = classroomsState.map((classroom) => {
        if (classroom.id === studentToDelete.classroomId) {
          return {
            ...classroom,
            students: classroom.students.filter(
              (student) => student.id !== studentId
            ),
          };
        }

        return classroom;
      });
      dispatch(setClassrooms(updatedClassrooms));
    }

    const updatedStudents = studentsState.filter(
      (student) => student.id !== studentId
    );

    dispatch(setStudents(updatedStudents));
    const response = await deleteStudentService(studentId);

    return response;
  };

  const createStudent = async (createStudentBody: ICreateStudentBody) => {

    if (studentsState === null) {
      throw new Error("This error will never be called. it is just here to fix typescript issues.");
    }

    const reply = await createStudentService(createStudentBody);
    dispatch(setStudents([...studentsState, reply]));

    return reply;
  };

  return {
    fetchAllStudents,
    addStudentToClass,
    deleteStudent,
    createStudent,
  };
};
