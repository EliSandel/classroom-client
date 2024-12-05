import { IStudent } from "./student.interface";

export interface IClassroom {
    id: string;
    name: string;
    maxOccupancy: number;
    createdAt?: string;
    updatedAt?: string;
    students: IStudent[];
}