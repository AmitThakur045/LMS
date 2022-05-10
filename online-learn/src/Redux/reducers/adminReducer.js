import {
  ADD_ADMIN,
  ADD_COURSE,
  DELETE_ADMIN,
  DELETE_COURSE,
  GET_ADMIN,
  GET_COURSE,
  UPDATE_ADMIN,
} from "../actionTypes";

const initialState = {
  adminAdded: false,
  admin: {},
  adminUpdated: false,
  adminDeleted: false,
  courseAdded: false,
  course: {},
  courseDeleted: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADMIN:
      return {
        ...state,
        adminAdded: action.payload,
      };
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        adminUpdated: action.payload,
      };
    case DELETE_ADMIN:
      return {
        ...state,
        adminDeleted: action.payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courseAdded: action.payload,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courseDeleted: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
