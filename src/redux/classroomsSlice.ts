import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClassroom } from "../interfaces/classroom.interface";

interface IInitialClassroomState {
  classrooms: IClassroom[] | null;
}

const initialState: IInitialClassroomState = {
  classrooms: null,
};

const classroomsSlice = createSlice({
  name: "classrooms",
  initialState: initialState,
  reducers: {
    setClassrooms: (state, action: PayloadAction<IClassroom[]>) => {
      return {
        ...state,
        classrooms: [...action.payload],
      };
    },
  },
});

export const { setClassrooms } = classroomsSlice.actions;
export default classroomsSlice.reducer;
