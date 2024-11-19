import { createSlice } from "@reduxjs/toolkit";

interface ClassroomState {
  classrooms: [];
}

const initialState: ClassroomState = {
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

export const { setClassrooms} = classroomsSlice.actions;
export default classroomsSlice.reducer;