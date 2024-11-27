import axios from "axios";
import { IClassroom } from "../interfaces/classroom.interface";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchClassrooms = async (): Promise<IClassroom[]> => {
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
  classroomBody: ICreateClassroomBody
): Promise<IClassroom> => {
  try {
    const response = await axios.post<IClassroom>(
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
