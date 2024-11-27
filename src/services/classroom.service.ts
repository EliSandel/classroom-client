import axios from "axios";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchClassrooms = async () => {
  const response = await axios.get(`${API_URL}/classrooms`);

  return response.data;
};

export const removeStudentFromClassroomService = async (
  classroomId: string,
  studentId: string
) => {
  const response = await axios.put(
    `${API_URL}/classrooms/${classroomId}/removeStudent/${studentId}`
  );

  return response.data;
};

export const deleteClassService = async (classroomId: string) => {
  const response = await axios.delete(`${API_URL}/classrooms/${classroomId}`);

  return response.data;
};

export const createClassroomService = async (
  classroomBody: ICreateClassroomBody
) => {
  try {
    const response = await axios.post(
      `${API_URL}/classrooms/addClassroom`,
      classroomBody
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "An error occurred while creating the classroom"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
