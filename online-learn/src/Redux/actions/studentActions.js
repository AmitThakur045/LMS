import {
  SET_ERRORS,
  STUDENT_LOGIN,
  GET_COURSE_BY_BATCH_CODE,
} from "../actionTypes";
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

export const getCourseByBatchCode = (batchCode) => async (dispatch) => {
  try {
    console.log("BatchCode", batchCode);
    const { data } = await api.getCourseByBatchCode(batchCode);
    dispatch({ type: GET_COURSE_BY_BATCH_CODE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
