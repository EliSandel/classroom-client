// src/api/classrooms.ts
import axios from 'axios';

// Base URL setup (optional)
const API_URL = 'http://localhost:3000/classrooms';


export const fetchClassrooms = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

export const removeStudentFromClassroom = async (classroomId: string, studentId: string) => {
    const response = await axios.put(`${API_URL}/${classroomId}/removeStudent/${studentId}`)
    return response.data;
}
