// src/api/classrooms.ts
import axios from "axios";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";

// Base URL setup (optional)
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
  const response = await axios.post(`${API_URL}/addClassroom`, classroomBody)
  return response.data;
};

//add try catch to all of my functions
