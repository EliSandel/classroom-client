import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setStudents } from "../redux/studentsSlice";
import { setClassrooms } from "../redux/classroomsSlice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import {
  deleteClassService,
  fetchClassrooms,
  removeStudentFromClassroomService,
} from "../services/classroom.service";

export const useClassroomsHook = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const classrooms: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  const students: IStudent[] = useSelector(
    (state: RootState) => state.students.students
  );

  
  const removeStudentFromClassroom = async (
    classroomId: string,
    studentId: string
  ): Promise<void> => {
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
    console.log(classrooms)

    const response = await removeStudentFromClassroomService(classroomId, studentId);
    return response;
  };

  const deleteClass = async (classroomId: string) => {
    // Must add validation to this function in util
    const updatedClassrooms = classrooms.filter(
      (classroom: IClassroom) => classroom.id !== classroomId
    );
    dispatch(setClassrooms(updatedClassrooms));
    const response = await deleteClassService(classroomId);
    return response;
  };
  
  const queryResults = useQuery({
    queryKey: ["classrooms"],
    queryFn: fetchClassrooms,
    enabled: classrooms.length === 0,
    onSuccess: (data) => {
      if (data) {
        dispatch(setClassrooms(data));
      }
    },
  });
  
  return {
    getAllClassrooms: () => queryResults,
    removeStudentFromClassroom,
    deleteClass,
  };
};
