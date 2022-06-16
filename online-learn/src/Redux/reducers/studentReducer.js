import {
  LOGOUT,
  STUDENT_LOGIN,
  GET_COURSE_BY_BATCH_CODE,
  GET_ALL_EVENTS,
} from "../actionTypes";

const initialState = {
  authData: null,
  courseList: [],
  allEvents: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
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
    default:
      return state;
  }
};

export default studentReducer;
