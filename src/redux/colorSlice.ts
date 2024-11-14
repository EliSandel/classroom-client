import { createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'color',
  initialState: {
    buttonColor: "#3F50B5",
  },
  reducers: {
    toggleColor: (state) => {        
      state.buttonColor = state.buttonColor === "#3F50B5" ? '#F50057' : "#3F50B5";
    },
  },
});

export const { toggleColor } = colorSlice.actions;
export default colorSlice.reducer;
