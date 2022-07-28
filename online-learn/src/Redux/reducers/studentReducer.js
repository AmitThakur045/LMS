import {
  LOGOUT,
  STUDENT_LOGIN,
  GET_COURSE_BY_BATCH_CODE,
  GET_ALL_EVENTS,
  GET_ASSIGNMENT_BY_BATCH_CODE,
  SUBMIT_ASSIGNMENT,
  SIGN_UP,
  OTP,
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
} from "../actionTypes";

const initialState = {
  authData: null,
  courseList: [],
  allEvents: [],
  assignment: [],
  assignmentSubmitted: false,
  studentSignedUp: false,
  otp: null,
  learnerUpdated: false,
  forgotPassword: false,
  resetPassword: false,
  threadAdded: false,
  threadReplyAdded: false,
  threads: [],
  batchThreads: [],
  problemCategories: [],
  batchProblemCategories: [],
  problemCategoryAdded: false,
  problemCategoryDeleted: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      localStorage.setItem("learner", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case GET_COURSE_BY_BATCH_CODE:
      return {
        ...state,
        courseList: action.payload,
      };
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };
    case GET_ASSIGNMENT_BY_BATCH_CODE:
      return {
        ...state,
        assignment: action.payload,
      };
    case SUBMIT_ASSIGNMENT:
      return {
        ...state,
        assignmentSubmitted: action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        studentSignedUp: action.payload,
      };
    case OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case UPDATE_LEARNER:
      return {
        ...state,
        learnerUpdated: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case ADD_THREAD:
      return {
        ...state,
        threadAdded: action.payload,
      };
    case ADD_THREAD_REPLY:
      return {
        ...state,
        threadReplyAdded: action.payload,
      };
    case ADD_PROBLEM_CATEGORY:
      return {
        ...state,
        problemCategoryAdded: action.payload,
      };
    case DELETE_PROBLEM_CATEGORY:
      return {
        ...state,
        problemCategoryDeleted: action.payload,
      };
    case GET_THREAD:
      return {
        ...state,
        threads: action.payload,
      };
    case GET_BATCH_THREAD:
      return {
        ...state,
        batchThreads: action.payload,
      };
    case GET_PROBLEM_CATEGORIES:
      return {
        ...state,
        problemCategories: action.payload,
      };
    case GET_BATCH_PROBLEM_CATEGORIES:
      return {
        ...state,
        batchProblemCategories: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
