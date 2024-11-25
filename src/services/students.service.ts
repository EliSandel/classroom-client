import axios from "axios";
import { ICreateStudentBody } from "../interfaces/createStudentBody.interface";
//must put url in .env.
//must add try catch to all fuction
// Base URL setup (optional)
const API_URL = "http://localhost:3000/students";

export const fetchStudentsService = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const deleteStudentService = async (studentId: string) => {
  const response = await axios.delete(`${API_URL}/${studentId}`);
  return response.data;
};

//this is not good. url is hardcoded
export const addStudentToClassService = async (
  classId: string,
  studentId: string
) => {
  const response = await axios.put(
    `http://localhost:3000/classrooms/${classId}/addStudent/${studentId}`
  );
  return response.data;
};

export const createStudentService = async (studentBody: ICreateStudentBody) => {
  try {
    const response = await axios.post(`${API_URL}/addStudent`, studentBody);
    return response.data;
  } catch (error) {
    if ( axios.isAxiosError(error) ) {
        console.error("Error creating student: ", error.response?.data || error.message);
        throw {
          status: error.response?.status,
          message: error.response?.data?.message || "Failed to create student",
        };
      }
      
      throw {
        status: null,
        message: "An unknown error ocurred while creatin student"
      }
  }
};
