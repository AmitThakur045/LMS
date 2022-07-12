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
    default:
      return state;
  }
};

export default studentReducer;
