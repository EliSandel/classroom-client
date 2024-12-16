import axios from "axios";
import { IAssignStudentDto } from "./dto/assign-student.dto";
import { ICreateClassroomDto } from "./dto/create-classroom.dto";
import { IUnasignStudentDto } from "./dto/unassign-students.dto";
import { IClassroom } from "../../interfaces/classroom.interface";

//axios instance

const API_URL = import.meta.env.VITE_API_URL;

export const fetchClassroomsService = async (): Promise<IClassroom[]> => {
  const response = await axios.get<IClassroom[]>(`${API_URL}/classrooms`);

  return response.data;
};

export const removeStudentFromClassroomService = async (
  unassignStudentBody: IUnasignStudentDto
): Promise<void> => {
  await axios.patch(
    `${API_URL}/classrooms/unassign-student`,
    unassignStudentBody
  );
};

export const addStudentToClassService = async (
  assignStudentBody: IAssignStudentDto
): Promise<void> => {
  await axios.patch(`${API_URL}/classrooms/assign-student`, assignStudentBody);
};

export const deleteClassService = async (
  classroomId: string
): Promise<void> => {
  await axios.delete(`${API_URL}/classrooms/${classroomId}`);
};

export const createClassroomService = async (
  classroomBody: ICreateClassroomDto
): Promise<void> => {
  await axios.post<IClassroom>(`${API_URL}/classrooms`, classroomBody);
};
