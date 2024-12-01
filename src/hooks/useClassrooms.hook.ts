import {
  deleteClassService,
  createClassroomService,
  removeStudentFromClassroomService,
} from "../services/classroom.service";
import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { validationForDeleteClass } from "../utilities/classroom.util";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

const useClassroomsHook = () => {
  const dispatch = useDispatch();

  const classrooms: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  const students: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  const removeStudentFromClassroom = async (
    classroomId: string,
    studentId: string
  ): Promise<void> => {
    const updatedClassrooms =
      classrooms?.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            students: classroom.students.filter(
              (student) => student.id !== studentId
            ),
          };
        }
        return classroom;
      }) ?? [];

    const updatedStudents =
      students?.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            classroomId: null,
          };
        }
        return student;
      }) ?? [];

    dispatch(setStudents(updatedStudents));
    dispatch(setClassrooms(updatedClassrooms));

    await removeStudentFromClassroomService(classroomId, studentId);
  };

  const deleteClass = async (
    classroomId: string,
    studentList: IStudent[]
  ): Promise<void> => {
    const canDelete = validationForDeleteClass(studentList);

    if (!canDelete) {
      throw new Error(
        `Cannot delete class: ${classroomId}. Classroom must be empty in order to delete.`
      );
    }

    const updatedClassrooms =
      classrooms?.filter((classroom) => classroom.id !== classroomId) ?? [];

    dispatch(setClassrooms(updatedClassrooms));
    await deleteClassService(classroomId);
  };

  const createClassroom = async (
    createClassroomBody: ICreateClassroomBody
  ): Promise<IClassroom> => {
    const response = await createClassroomService(createClassroomBody);
    dispatch(setClassrooms([...(classrooms || []), response]));

    return response;
  };

  return {
    classrooms,
    removeStudentFromClassroom,
    deleteClass,
    createClassroom,
  };
};

export default useClassroomsHook;
