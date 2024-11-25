import axios from "axios";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

const API_URL = "http://localhost:3000/classrooms";

export const fetchClassrooms = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const removeStudentFromClassroomService = async (
  classroomId: string,
  studentId: string
) => {
  const response = await axios.put(
    `${API_URL}/${classroomId}/removeStudent/${studentId}`
  );
  return response.data;
};

export const deleteClassService = async (classroomId: string) => {
  const response = await axios.delete(`${API_URL}/${classroomId}`);
  return response.data;
};

export const createClassroomService = async (classroomBody: ICreateClassroomBody) => {

  try {
    const response = await axios.post(`${API_URL}/addClassroom`, classroomBody)
    return response.data;
  } catch (error) {

    if ( axios.isAxiosError(error) ) {
      console.error("Error creating classroom: ", error.response?.data || error.message);
      throw {
        status: error.response?.status,
        message: error.response?.data?.message || "Failed to create classroom",
      };
    }
    
    throw {
      status: null,
      message: "An unknown error ocurred while creatin classroom"
    }
  }
};
