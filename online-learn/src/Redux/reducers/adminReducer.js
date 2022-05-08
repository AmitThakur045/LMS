import {
  ADD_ADMIN,
  DELETE_ADMIN,
  GET_ADMIN,
  UPDATE_ADMIN,
} from "../actionTypes";

const initialState = {
  adminAdded: false,
  admin: {},
  adminUpdated: false,
  adminDeleted: false,
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
    default:
      return state;
  }
};

export default adminReducer;
