import { createSlice } from "@reduxjs/toolkit";

interface IInitialClassroomState {
  classrooms: [];
}

const initialState: IInitialClassroomState = {
  classrooms: [],
}

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState: initialState,
  reducers: {
    setClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },
  },
});

export const { setClassrooms } = classroomsSlice.actions;
export default classroomsSlice.reducer;