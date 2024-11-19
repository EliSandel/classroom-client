import { configureStore } from '@reduxjs/toolkit';

import colorReducer from "../redux/colorSlice";
import studentsReducer from "../redux/studentsSlice";
import classroomsReducer from '../redux/classroomsSlice';



const store = configureStore({
  reducer: {
    color: colorReducer,
    classrooms: classroomsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
