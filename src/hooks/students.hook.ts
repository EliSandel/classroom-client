import {
  addStudentToClassService,
  createStudentService,
  deleteStudentService,
} from "../services/students.service";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
import { setStudents } from "../redux/students.slice";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "../utilities/error.util";
import { setClassrooms } from "../redux/classrooms.slice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { ICreateStudentBody } from "../interfaces/createStudentBody.interface";

const useStudentsHook = () => {
  const dispatch = useDispatch();

  const studentsState = useAppSelector((state) => state.students.students);
  const classroomsState = useAppSelector((state) => state.classrooms.classrooms);

  const rollbackState = (
    previousStudentsState: IStudent[] | null,
    previousClassroomsState: IClassroom[] | null
  ): void => {
    if (previousStudentsState) {
      dispatch(setStudents(previousStudentsState));
    }
    if (previousClassroomsState) {
      dispatch(setClassrooms(previousClassroomsState));
    }
  };

  const addStudentToClass = async (
    classId: string,
    studentId: string
  ): Promise<void> => {
    const previousStudentsState: IStudent[] = studentsState ?? [];
    const previousClassroomsState: IClassroom[] = classroomsState ?? [];

    try {
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

      await addStudentToClassService(classId, studentId);
      toast.success("Student successfully added to Class.");
    } catch (error) {
      console.log(error);
      rollbackState(previousStudentsState, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  const deleteStudent = async (studentId: string): Promise<void> => {
    const previousStudentsState: IStudent[] = studentsState ?? [];
    const previousClassroomsState: IClassroom[] = classroomsState ?? [];

    try {
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
      toast.success("Student successfully deleted.");
    } catch (error) {
      console.log(error);
      rollbackState(previousStudentsState, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  const createStudent = async (
    createStudentBody: ICreateStudentBody
  ): Promise<void> => {
    const previousStudentsState: IStudent[] = studentsState ?? [];

    try {
      const newStudent: IStudent = {
        ...createStudentBody,
        classroomId: null,
      }
      await createStudentService(createStudentBody);
      dispatch(setStudents([...(studentsState ?? []), newStudent]));
      toast.success("Student successfully created.");
    } catch (error) {
      console.log(error);
      rollbackState(previousStudentsState, null);
      toast.error(getErrorMessage(error));
    }
  };

  return {
    addStudentToClass,
    deleteStudent,
    createStudent,
  };
};

export default useStudentsHook;
