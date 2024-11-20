import { Dispatch } from "@reduxjs/toolkit";
import {
  fetchClassrooms,
  removeStudentFromClassroom,
} from "../api/classrooms.api";
import { IClassroom } from "../interfaces/classroom.interface";
import { IStudent } from "../interfaces/student.interface";
import { setClassrooms } from "../redux/classroomsSlice";
import { setStudents } from "../redux/studentsSlice";

export const getClassrooms = async () => {
  const data = await fetchClassrooms();
  //transform the data as neccessary

  return data;
};

export const removeStudentFromClassroomService = async (
  classroomId: string,
  studentId: string,
  classroomsState: IClassroom[],
  studentsState: IStudent[],
  dispatch: Dispatch,
) => {

  const updatedClassrooms = classroomsState.map((classroom) => {
    if (classroom.id === classroomId) {
      return {
        ...classroom,
        students: classroom.students.filter((student) => student.id !== studentId),
      }
    }
    return classroom;
  })

  const updatedStudents = studentsState.map((student) => {
    if (student.id === studentId) {
      return {
        ...student,
        classroomId: null,
      };
    }
    return student;
  })

  dispatch(setClassrooms(updatedClassrooms));
  dispatch(setStudents(updatedStudents))



  const data = await removeStudentFromClassroom(classroomId, studentId);
  console.log("finished fetch");
  

  return data;
};
