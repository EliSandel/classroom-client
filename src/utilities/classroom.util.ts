import { IStudent } from "../interfaces/student.interface";

export const validationForDeleteClass = (studentsList: IStudent[]) => {
  if (studentsList.length === 0) {
    return true;
  }

  return false;
};
