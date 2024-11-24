import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudent } from "../interfaces/student.interface";

interface IInitialStudentsState {
  students: IStudent[];
}

const initialState: IInitialStudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState: initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.students = [...action.payload];
    },
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
