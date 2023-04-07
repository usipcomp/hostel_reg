import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getHostelFailure,
  getHostelStart,
  getHostelSuccess,
} from "./hostelRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:4000/hostelreg/login", user);
    console.log("response", res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getHostels = async (dispatch) => {
  dispatch(getHostelStart());
  try {
    const res = await axios.get("http://localhost:4000/hostels");
    dispatch(getHostelSuccess(res.data));
  } catch (err) {
    dispatch(getHostelFailure());
  }
};
