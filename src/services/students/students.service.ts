import axios from "axios";
import { IStudent } from "../../interfaces/student.interface";
import { ICreateStudentDto } from "./dto/create-student.dto";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStudentsService = async (): Promise<IStudent[]> => {
  const response = await axios.get<IStudent[]>(`${API_URL}/students`);

  return response.data;
};

export const deleteStudentService = async (
  studentId: string
): Promise<void> => {
  await axios.delete(`${API_URL}/students/${studentId}`);
};

export const addStudentToClassService = async (
  classId: string,
  studentId: string
): Promise<void> => {
  await axios.put(`${API_URL}/classrooms/${classId}/addStudent/${studentId}`);
};

export const createStudentService = async (
  studentBody: ICreateStudentDto
): Promise<void> => {
  await axios.post<IStudent>(`${API_URL}/students/addStudent`, studentBody);
};
