import { LOGOUT, STUDENT_LOGIN, GET_COURSE_BY_BATCH_CODE } from "../actionTypes";

const initialState = {
  authData: null,
  courseList: [],
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
    default:  
      return state;
  }
};

export default studentReducer;
