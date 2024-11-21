import { IStudent } from "../interfaces/student.interface";


export const validationForDeleteClass = async (studentsList: IStudent[]): Promise<boolean> => {
    if (studentsList.length > 0) {
        return false
    }
    if (studentsList.length === 0) {
        return true
    }
    return false
}