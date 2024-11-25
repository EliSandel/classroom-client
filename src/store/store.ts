import { configureStore } from '@reduxjs/toolkit';

import studentsReducer from "../redux/studentsSlice";
import classroomsReducer from '../redux/classroomsSlice';



const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
