import { createSlice } from "@reduxjs/toolkit";

interface IInitialStudentsState {
  students: [];
}

const initialState: IInitialStudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState: initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
