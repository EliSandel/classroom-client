import { IStudent } from "../interfaces/student.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialStudentsState {
  students: IStudent[] | null;
}

const initialState: IInitialStudentsState = {
  students: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<IStudent[]>) => {
      return {
        ...state,
        students: [...action.payload],
      };
    },
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
