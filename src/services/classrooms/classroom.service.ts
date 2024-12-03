import axios from "axios";
import { IClassroom } from "../../interfaces/classroom.interface";
import { ICreateClassroomDto } from "./dto/create-classroom.dto";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchClassroomsService = async (): Promise<IClassroom[]> => {
  const response = await axios.get<IClassroom[]>(`${API_URL}/classrooms`);

  return response.data;
};

export const removeStudentFromClassroomService = async (
  classroomId: string,
  studentId: string
): Promise<void> => {
  await axios.put(
    `${API_URL}/classrooms/${classroomId}/removeStudent/${studentId}`
  );
};

export const deleteClassService = async (
  classroomId: string
): Promise<void> => {
  await axios.delete(`${API_URL}/classrooms/${classroomId}`);
};

export const createClassroomService = async (
  classroomBody: ICreateClassroomDto
): Promise<void> => {
  await axios.post<IClassroom>(
    `${API_URL}/classrooms/addClassroom`,
    classroomBody
  );
};
