import {
  addStudentToClassService,
  createStudentService,
  deleteStudentService,
} from "../services/students.service";
import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { ICreateStudentBody } from "../interfaces/createStudentBody.interface";

const useStudentsHook = () => {
  const dispatch = useDispatch();

  const studentsState: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  const classroomsState: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const addStudentToClass = async (
    classId: string,
    studentId: string
  ): Promise<void> => {
    const studentToAdd = studentsState?.find(
      (student) => student.id === studentId
    );

    if (!studentToAdd) {
      throw new Error("Student not found");
    }

    const updatedStudentToAdd: IStudent = {
      ...studentToAdd,
      classroomId: classId,
    };

    const updatedClassrooms =
      classroomsState?.map((classroom) => {
        if (classroom.id === classId) {
          return {
            ...classroom,
            students: [...classroom.students, updatedStudentToAdd],
          };
        }

        return classroom;
      }) ?? [];

    const updatedStudents =
      studentsState?.map((student) => {
        if (student.id === studentId) {
          return updatedStudentToAdd;
        }

        return student;
      }) ?? [];

    dispatch(setStudents(updatedStudents));
    dispatch(setClassrooms(updatedClassrooms));

    addStudentToClassService(classId, studentId);
  };

  const deleteStudent = async (studentId: string): Promise<void> => {
    const studentToDelete = studentsState?.find(
      (student) => student.id === studentId
    );

    if (!studentToDelete) {
      throw new Error("Student not found");
    }

    if (studentToDelete.classroomId) {
      const updatedClassrooms =
        classroomsState?.map((classroom) => {
          if (classroom.id === studentToDelete.classroomId) {
            return {
              ...classroom,
              students: classroom.students.filter(
                (student) => student.id !== studentId
              ),
            };
          }

          return classroom;
        }) ?? [];

      dispatch(setClassrooms(updatedClassrooms));
    }

    const updatedStudents =
      studentsState?.filter((student) => student.id !== studentId) ?? [];

    dispatch(setStudents(updatedStudents));
    await deleteStudentService(studentId);
  };

  const createStudent = async (
    createStudentBody: ICreateStudentBody
  ): Promise<IStudent> => {
    const reply = await createStudentService(createStudentBody);
    dispatch(setStudents([...(studentsState || []), reply]));

    return reply;
  };

  return {
    addStudentToClass,
    deleteStudent,
    createStudent,
  };
};

export default useStudentsHook;
