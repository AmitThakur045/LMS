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
  ADD_THREAD,
  GET_THREAD,
  ADD_THREAD_REPLY,
  GET_PROBLEM_CATEGORIES,
  ADD_PROBLEM_CATEGORY,
  DELETE_PROBLEM_CATEGORY,
  GET_BATCH_THREAD,
  GET_BATCH_PROBLEM_CATEGORIES,
  RESET_PASSWORD,
  GET_STUDENT,
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
    const { data } = await api.generateOtp(formData);
    dispatch({ type: OTP, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const studentSignUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.studentSignUp(formData);

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

export const resetPasswordStudent = (value) => async (dispatch) => {
  try {
    const { data } = await api.resetPasswordStudent(value);
    alert("Password Reset Successfully");
    dispatch({ type: RESET_PASSWORD, payload: true });
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
export const addThread = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addThread(formData);
    dispatch({ type: ADD_THREAD, payload: true });
    alert("Thread Added Successfully");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getStudentData = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudentData(formData);
    dispatch({ type: GET_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addThreadReply = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addThreadReply(formData);
    dispatch({ type: ADD_THREAD_REPLY, payload: true });
    alert("Thread Reply Added Successfully");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addProblemCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addProblemCategory(formData);
    dispatch({ type: ADD_PROBLEM_CATEGORY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const deleteProblemCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteProblemCategory(formData);
    dispatch({ type: DELETE_PROBLEM_CATEGORY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getThreads = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getThreads(formData);
    if (formData.communityType === "Batch") {
      dispatch({ type: GET_BATCH_THREAD, payload: data });
    } else {
      dispatch({ type: GET_THREAD, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getProblemCategories = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getProblemCategories(formData);
    if (formData.communityType === "Batch") {
      dispatch({ type: GET_BATCH_PROBLEM_CATEGORIES, payload: data });
    } else {
      dispatch({ type: GET_PROBLEM_CATEGORIES, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
