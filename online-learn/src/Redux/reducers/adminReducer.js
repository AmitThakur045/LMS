import {
  ADD_ADMIN,
  ADD_BATCH,
  ADD_COURSE,
  ADD_STUDENT,
  DELETE_ADMIN,
  DELETE_COURSE,
  GET_ADMIN,
  GET_ALL_ADMIN,
  GET_ALL_COURSE,
  GET_ALL_STUDENT,
  GET_ALL_BATCH,
  GET_COURSE,
  GET_STUDENT,
  UPDATE_ADMIN,
  GET_BATCH,
  GET_COURSES,
  ADD_EVENT,
  GET_BATCH_EVENT,
  INDEX_COUNTER,
  GET_STUDENTS,
  UPLOAD_ATTENDANCE,
  GET_ATTENDANCE,
  ADD_ASSIGNMENT,
} from "../actionTypes";

const initialState = {
  adminAdded: false,
  admin: {},
  adminUpdated: false,
  adminDeleted: false,
  courseAdded: false,
  course: {},
  courses: [],
  students: [],
  batch: {},
  courseDeleted: false,
  studentAdded: false,
  allStudent: [],
  allCourse: [],
  allAdmin: [],
  allBatch: [],
  student: {},
  batchAdded: false,
  eventAdded: false,
  batchEvent: [],
  attendance: [],
  index: 0,
  attendanceUploaded: false,
  assignmentAdded: false,
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
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courseDeleted: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        studentAdded: action.payload,
      };
    case INDEX_COUNTER:
      return {
        ...state,
        index: action.payload,
      };
    case GET_ALL_STUDENT:
      return {
        ...state,
        allStudent: action.payload,
      };
    case GET_ALL_ADMIN:
      return {
        ...state,
        allAdmin: action.payload,
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
    case GET_BATCH:
      return {
        ...state,
        batch: action.payload,
      };
    case GET_ALL_COURSE:
      return {
        ...state,
        allCourse: action.payload,
      };
    case GET_ALL_BATCH:
      return {
        ...state,
        allBatch: action.payload,
      };
    case ADD_BATCH:
      return {
        ...state,
        batchAdded: action.payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        eventAdded: action.payload,
      };
    case GET_BATCH_EVENT:
      return {
        ...state,
        batchEvent: action.payload,
      };
    case UPLOAD_ATTENDANCE:
      return {
        ...state,
        attendanceUploaded: action.payload,
      };
    case GET_ATTENDANCE:
      return {
        ...state,
        attendance: action.payload,
      };
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignmentAdded: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
