import { SET_ERRORS, STUDENT_LOGIN } from "../actionTypes";
import * as api from "../api";

export const studentSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.studentSignIn(formData);
    dispatch({ type: STUDENT_LOGIN, data });
    navigate("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
