// src/services/classroomService.ts
import { fetchClassrooms } from '../api/classrooms.api';

export const getClassrooms = async () => {
    const data = await fetchClassrooms();
    //transform the data as neccessary 

    return data;
};
