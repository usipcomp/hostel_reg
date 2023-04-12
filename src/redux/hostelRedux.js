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
    // update hostel info
    // updateHostel:(state,action)=>{
    //   const {hID,oneS,twoS,threeSAC,threeSNAC,Type}= action.payload;
    //   state.hostels = state.hostels.map((h)=>{
    //     if(h.HostelID===hID){
    //       if (oneS){newHostel_info.oneS = oneS}
    //       if (twoS){newHostel_info.twoS = twoS}
    //       if (threeSAC){newHostel_info.threeSAC = threeSAC}
    //       if (threeSNAC){newHostel_info.threeSNAC = threeSNAC}
    //       if (Type){newHostel_info.Type = Type}
    //     }
    //     return h;
    //   })
    // },
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
