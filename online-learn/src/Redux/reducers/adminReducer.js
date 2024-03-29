import {
  ADD_ADMIN,
  ADD_BATCH,
  ADD_COURSE,
  ADD_STUDENT,
  DELETE_ADMIN,
  DELETE_COURSE,
  OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
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
  GET_ATTENDANCE_BY_BATCH_CODES,
  ADD_ASSIGNMENT,
  GET_STUDENT_BY_ASSIGNMENT_CODE,
  ADD_SCORE,
  GET_EVENT_BY_COURSE_CODE,
  GET_ALL_ORGANIZATION_NAME,
  ADD_BATCH_LINK,
  ADMIN_LOGIN,
  LOGOUT,
  GET_COURSES_LENGTH,
  GET_ALL_STUDENT_LENGTH,
  GET_ALL_ADMIN_LENGTH,
  UPDATE_COURSE_DATA,
  GET_ATTENDANCE_STATUS,
  ADD_DELETE_QUERY,
  GET_ALL_DELETE_QUERY,
  UPDATE_DELETE_QUERY,
  GET_BATCHES_BY_BATCH_CODE,
  DASHBOARD_DATA,
  UPDATE_STUDENT,
  TOTAL_ASSIGNMENT,
  UPDATE_STATUS,
  UPDATE_BATCH_ADMIN,
  ADD_ORGANIZATION,
  GET_BATCH_LESSON_VIDEO,
  GET_ALL_COURSE_CODES,
} from "../actionTypes";

const initialState = {
  authData: null,
  adminAdded: false,
  admin: {},
  adminUpdated: false,
  studentUpdated: false,
  adminDeleted: false,
  resetPassword: false,
  forgotPassword: false,
  otp: null,
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
  batchLessonVideo: {},
  batchAdded: false,
  eventAdded: false,
  batchEvent: [],
  attendance: [],
  index: 0,
  attendanceUploaded: false,
  assignmentAdded: false,
  scoreAdded: false,
  studentList: [],
  eventByCourseCode: [],
  allOrganizationName: [],
  batchLinkAdded: false,
  coursesLength: 0,
  studentsLength: 0,
  adminsLength: 0,
  courseUpdated: false,
  attendanceStatus: {},
  deleteQuery: false,
  allDeleteQuery: [],
  deleteQueryUpdated: false,
  batchArray: [],
  adminDashboardData: {},
  totalAssignment: -1,
  batchAdminUpdated: false,
  statusUpdated: false,
  organizationAdded: false,
  allCourseCodes: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      sessionStorage.setItem("user", JSON.stringify({ ...action?.data }));
      sessionStorage.setItem("admin", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case ADD_ADMIN:
      return {
        ...state,
        adminAdded: action.payload,
      };
    case OTP:
      return {
        ...state,
        otp: action.payload,
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
    case ADD_DELETE_QUERY:
      return {
        ...state,
        deleteQuery: action.payload,
      };
    case UPDATE_DELETE_QUERY:
      return {
        ...state,
        deleteQueryUpdated: action.payload,
      };
    case TOTAL_ASSIGNMENT:
      return {
        ...state,
        totalAssignment: action.payload,
      };
    case ADD_BATCH_LINK:
      return {
        ...state,
        batchLinkAdded: action.payload,
      };
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case GET_ALL_DELETE_QUERY:
      return {
        ...state,
        allDeleteQuery: action.payload,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        adminUpdated: action.payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        studentUpdated: action.payload,
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
    case GET_ALL_STUDENT_LENGTH:
      return {
        ...state,
        studentsLength: action.payload,
      };
    case GET_ALL_ADMIN:
      return {
        ...state,
        allAdmin: action.payload,
      };
    case GET_ALL_ADMIN_LENGTH:
      return {
        ...state,
        adminsLength: action.payload,
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
    case GET_BATCH_LESSON_VIDEO:
      return {
        ...state,
        batchLessonVideo: action.payload,
      };
    case GET_BATCHES_BY_BATCH_CODE:
      return {
        ...state,
        batchArray: action.payload,
      };
    case GET_ATTENDANCE_STATUS:
      return {
        ...state,
        attendanceStatus: action.payload,
      };
    case GET_ALL_COURSE:
      return {
        ...state,
        allCourse: action.payload,
      };
    case GET_COURSES_LENGTH:
      return {
        ...state,
        coursesLength: action.payload,
      };
    case GET_ALL_ORGANIZATION_NAME:
      return {
        ...state,
        allOrganizationName: action.payload,
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
    case GET_ATTENDANCE_BY_BATCH_CODES:
      return {
        ...state,
        attendance: action.payload,
      };
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignmentAdded: action.payload,
      };
    case GET_STUDENT_BY_ASSIGNMENT_CODE:
      return {
        ...state,
        studentList: action.payload,
      };
    case ADD_SCORE:
      return {
        ...state,
        scoreAdded: action.payload,
      };
    case GET_EVENT_BY_COURSE_CODE:
      return {
        ...state,
        eventByCourseCode: action.payload,
      };
    case UPDATE_COURSE_DATA:
      return {
        ...state,
        courseUpdated: action.payload,
      };
    case DASHBOARD_DATA:
      return {
        ...state,
        adminDashboardData: action.payload,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        statusUpdated: action.payload,
      };
    case UPDATE_BATCH_ADMIN:
      return {
        ...state,
        batchAdminUpdated: action.payload,
      };
    case ADD_ORGANIZATION:
      return {
        ...state,
        organizationAdded: action.payload,
      };
    case GET_ALL_COURSE_CODES:
      return {
        ...state,
        allCourseCodes: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
