import { createSlice } from "@reduxjs/toolkit";

export const hostelSlice = createSlice({
  name: "hostel",
  initialState: {
    hostels: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GETALL
    getHostelStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getHostelSuccess: (state, action) => {
      state.isFetching = false;
      state.hostels = action.payload;
    },
    getHostelFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // remove hostel
    deleteHostel:(state,action)=>{
      const hID = action.payload;
      state.hostels = state.hostels.filter((h)=>h.HostelID!==hID);
    }
  },
});

export const { getHostelFailure, getHostelSuccess, getHostelStart,deleteHostel} =
  hostelSlice.actions;

export default hostelSlice.reducer;
