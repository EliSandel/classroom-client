import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudents } from '../services/students.service'; 

// Define async thunk to fetch students by classroomId
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const students = await getStudents();
    return students;
  }
);

// Initial state for the students slice
interface StudentState {
  students: [];
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  isLoading: false,
  error: null,
};

// Create slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch students';
      });
  },
});

export default studentSlice.reducer;
