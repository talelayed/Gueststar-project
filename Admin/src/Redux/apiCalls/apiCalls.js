import { publicRequest } from "../../RequestMethods";
import { authFailed, authLoading, authSuccess } from "../slices/AuthSlice";

export const register = async (dispatch, user) => {
  dispatch(authLoading());
  try {
    const res = await publicRequest.post("register", user);
    dispatch(authSuccess(res.data));
  } catch (err) {
    dispatch(authFailed());
  }
};

export const login = async (dispatch, user) => {  
  dispatch(authLoading());
  try {
    const res = await publicRequest.post("workers/login", user);
    dispatch(authSuccess(res.data));
  } catch (err) {
    dispatch(authFailed());
  }
};
