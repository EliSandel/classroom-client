import {
  fetchClassrooms,
  deleteClassService,
  createClassroomService,
  removeStudentFromClassroomService,
} from "../services/classroom.service";
import { RootState } from "../store/store";
import { useQueryClient } from "react-query";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { validationForDeleteClass } from "../utilities/classroom.util";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

export const useClassroomsHook = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const classrooms: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  const students: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  const fetchAllClassrooms = async () => {
    
    if (classrooms !== null) {
      return;
    }
    const data = await queryClient.fetchQuery({
      queryKey: ["classrooms"],
      queryFn: fetchClassrooms,
      staleTime: Infinity,
    });

    if (data) {
      dispatch(setClassrooms(data));
    }

    return data;
  };

  const removeStudentFromClassroom = async (
    classroomId: string,
    studentId: string
  ): Promise<void> => {
    const updatedClassrooms =
      classrooms?.map((classroom: IClassroom) => {

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
      students?.map((student: IStudent) => {
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

    const response = await removeStudentFromClassroomService(
      classroomId,
      studentId
    );

    return response;
  };

  const deleteClass = async (classroomId: string, studentList: IStudent[]) => {

    if (await validationForDeleteClass(studentList)) {
      const updatedClassrooms =
        classrooms?.filter((classroom) => classroom.id !== classroomId) ?? [];

      dispatch(setClassrooms(updatedClassrooms));
      const response = await deleteClassService(classroomId);
      return response;
    }
    throw new Error(
      "Cannot delete class: " +
        classroomId +
        ". Classroom must be empty in order to delete."
    );
  };

  const createClassroom = async (createClassroomBody: ICreateClassroomBody) => {
    const response = await createClassroomService(createClassroomBody);
    dispatch(setClassrooms([...(classrooms || []), response]));

    return response;
  };

  return {
    fetchAllClassrooms,
    removeStudentFromClassroom,
    deleteClass,
    createClassroom,
  };
};
