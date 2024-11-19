// src/services/classroomService.ts
import { fetchStudents } from '../api/students.api';

export const getStudents = async () => {
    const data = await fetchStudents();
    //transform the data as neccessary 

    return data;
};
