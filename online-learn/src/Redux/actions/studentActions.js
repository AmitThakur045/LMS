import {
  SET_ERRORS,
  STUDENT_LOGIN,
  GET_COURSE_BY_BATCH_CODE,
  GET_ALL_EVENTS,
  GET_ASSIGNMENT_BY_BATCH_CODE,
  SUBMIT_ASSIGNMENT,
  SIGN_UP,
  OTP,
  GET_BATCH_LESSON_VIDEO,
  UPDATE_LEARNER,
  FORGOT_PASSWORD,
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

export const generateOtp = (formData) => async (dispatch) => {
  try {
    // console.log("otp", formData);
    const { data } = await api.generateOtp(formData);
    dispatch({ type: OTP, payload: data });
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

export const getBatchLessonVideoByCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getBatchLessonVideoByCourse(formData);
    dispatch({ type: GET_BATCH_LESSON_VIDEO, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error });
  }
};

export const updateLearner = (value, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateLearner(value);
    dispatch({ type: UPDATE_LEARNER, payload: true });
    alert("Updated Successfully");
    navigate("/profile");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const forgotPassword = (value, navigate) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(value);
    dispatch({ type: FORGOT_PASSWORD, payload: true });
    alert("Password Updated Successfully");
    navigate("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const generateOtpForPasswordReset = (formData) => async (dispatch) => {
  try {
    const { data } = await api.generateOtpForPasswordReset(formData);
    dispatch({ type: OTP, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
