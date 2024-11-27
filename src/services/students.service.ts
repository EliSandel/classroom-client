import axios from "axios";
import { ICreateStudentBody } from "../interfaces/createStudentBody.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStudentsService = async () => {
  const response = await axios.get(`${API_URL}/students`);

  return response.data;
};

export const deleteStudentService = async (studentId: string) => {
  const response = await axios.delete(`${API_URL}/students/${studentId}`);

  return response.data;
};

export const addStudentToClassService = async (
  classId: string,
  studentId: string
) => {
  const response = await axios.put(
    `${API_URL}/classrooms/${classId}/addStudent/${studentId}`
  );

  return response.data;
};

export const createStudentService = async (studentBody: ICreateStudentBody) => {
  try {
    const response = await axios.post(`${API_URL}/students/addStudent`, studentBody);

    return response.data;
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while creating the student"
      );
    }

    throw new Error("An unexpected error occurred.");
  }
};
