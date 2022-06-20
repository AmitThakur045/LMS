import {
  SET_ERRORS,
  STUDENT_LOGIN,
  GET_COURSE_BY_BATCH_CODE,
  GET_ALL_EVENTS,
  GET_ASSIGNMENT_BY_BATCH_CODE,
  SUBMIT_ASSIGNMENT,
  SIGN_UP,
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
    const { data } = await api.getCourseByBatchCode(batchCode);
    dispatch({ type: GET_COURSE_BY_BATCH_CODE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllEvents = (batchCode) => async (dispatch) => {
  try {
    const { data } = await api.getAllEvents(batchCode);
    dispatch({ type: GET_ALL_EVENTS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAssignmentByBatchCode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAssignmentByBatchCode(formData);
    dispatch({ type: GET_ASSIGNMENT_BY_BATCH_CODE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const submitAssignment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.submitAssignment(formData);
    alert("Assignment Submitted Succesfully");
    dispatch({ type: SUBMIT_ASSIGNMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const studentSignUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.studentSignUp(formData);
    alert("Student Added Succesfully");
    dispatch({ type: SIGN_UP, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
