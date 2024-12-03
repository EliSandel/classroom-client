import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../redux/students.slice";
import classroomsReducer from "../redux/classrooms.slice";

const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
