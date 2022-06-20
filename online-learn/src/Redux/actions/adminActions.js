import {
  ADD_ADMIN,
  GET_ADMIN,
  SET_ERRORS,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  ADD_COURSE,
  GET_COURSE,
  DELETE_COURSE,
  ADD_STUDENT,
  GET_ALL_STUDENT,
  GET_STUDENT,
  GET_ALL_COURSE,
  ADD_BATCH,
  GET_ALL_ADMIN,
  GET_ALL_BATCH,
  GET_BATCH,
  GET_COURSES,
  ADD_EVENT,
  GET_BATCH_EVENT,
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
} from "../actionTypes";
import * as api from "../api";

export const adminSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminSignIn(formData);
    dispatch({ type: ADMIN_LOGIN, data });
    navigate("/admin/dashboard");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAdmin(formData);
    alert("Admin Added Successfully");
    dispatch({ type: ADD_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addStudentQuery = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addStudentQuery(formData);
    alert("Wait for any super admin to confirm");
    dispatch({ type: ADD_DELETE_QUERY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateDeleteQuery = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateDeleteQuery(formData);
    alert("Status Updated");
    dispatch({ type: UPDATE_DELETE_QUERY, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAdmin(formData);
    dispatch({ type: GET_ADMIN, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateAdmin = (value, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateAdmin(value);
    dispatch({ type: UPDATE_ADMIN, payload: true });
    alert("Admin Updated Successfully");
    navigate("/admin/admin");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateStudent = (value, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(value);
    dispatch({ type: UPDATE_STUDENT, payload: true });
    alert("Student Updated Successfully");
    navigate("/admin/student");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteAdmin(formData);
    alert("Admin Deleted");
    dispatch({ type: DELETE_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(formData);
    alert("Course Added Successfully");
    dispatch({ type: ADD_COURSE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getCourse(formData);
    dispatch({ type: GET_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getCourses = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getCourses(formData);
    localStorage.setItem("courses", JSON.stringify(data));
    dispatch({ type: GET_COURSES, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getStudents = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudents(formData);
    localStorage.setItem("students", JSON.stringify(data));
    dispatch({ type: GET_STUDENTS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const totalAssignment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.totalAssignment(formData);

    dispatch({ type: TOTAL_ASSIGNMENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(formData);
    alert("Course Deleted");
    dispatch({ type: DELETE_COURSE, payload: true });
    dispatch({ type: GET_COURSE, payload: {} });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addStudent(formData);
    alert("Student Added Successfully");
    dispatch({ type: ADD_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addStudentInBatch = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addStudentInBatch(formData);
    alert("Student Added Successfully");
    dispatch({ type: ADD_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudent();
    dispatch({ type: GET_ALL_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllStudentLength = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudentLength();
    dispatch({ type: GET_ALL_STUDENT_LENGTH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getStudentsLengthBySubAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudentsLengthBySubAdmin(formData);
    dispatch({ type: GET_ALL_STUDENT_LENGTH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllAdmin = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAdmin();
    dispatch({ type: GET_ALL_ADMIN, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllAdminLength = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAdminLength();
    dispatch({ type: GET_ALL_ADMIN_LENGTH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAdminsByOrganizationName = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAdminsByOrganizationName(formData);
    dispatch({ type: GET_ALL_ADMIN, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAdminsLengthByOrganizationName =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.getAdminsLengthByOrganizationName(formData);
      dispatch({ type: GET_ALL_ADMIN_LENGTH, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
export const getStudentsByOrganizationName = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudentsByOrganizationName(formData);
    dispatch({ type: GET_ALL_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getStudent(formData);
    dispatch({ type: GET_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourse();
    dispatch({ type: GET_ALL_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addBatch = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addBatch(formData);
    alert("Batch Added Successfully");
    dispatch({ type: ADD_BATCH, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllBatchCodes = () => async (dispatch) => {
  try {
    const { data } = await api.getAllBatchCodes();
    dispatch({ type: GET_ALL_BATCH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getCoursesLength = () => async (dispatch) => {
  try {
    const { data } = await api.getCoursesLength();
    dispatch({ type: GET_COURSES_LENGTH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllDeleteQuery = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDeleteQuery();
    dispatch({ type: GET_ALL_DELETE_QUERY, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllDeleteQueryBySubAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAllDeleteQueryBySubAdmin(formData);
    dispatch({ type: GET_ALL_DELETE_QUERY, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getBatchCodesBySubAdmin = (formData) => async (dispatch) => {
  try {
    console.log("form", formData);
    const { data } = await api.getBatchCodesBySubAdmin(formData);
    dispatch({ type: GET_ALL_BATCH, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getBatch = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.getBatch(formData);
    dispatch({ type: GET_BATCH, payload: data });
  } catch (error) {
    // dispatch({ type: SET_ERRORS, payload: error });
  }
};

export const getBatchesByBatchCode = (allBatches) => async (dispatch) => {
  try {
    console.log("allBatchesForm", allBatches);
    const { data } = await api.getBatchesByBatchCode(allBatches);
    // console.log("dataForm", data);
    dispatch({ type: GET_BATCHES_BY_BATCH_CODE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCourseCodes = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseCodes();
    dispatch({ type: GET_ALL_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllOrganizationName = () => async (dispatch) => {
  try {
    const { data } = await api.getAllOrganizationName();
    dispatch({ type: GET_ALL_ORGANIZATION_NAME, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addEvent = (batchCode, newEvent) => async (dispatch) => {
  try {
    const { data } = await api.addEvent({ batchCode, newEvent });
    alert("Event Added Successfully");
    dispatch({ type: ADD_EVENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addBatchLink = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addBatchLink(formData);
    alert("Batch Link added Successfully");
    dispatch({ type: ADD_BATCH_LINK, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getBatchEvent = (batchCode) => async (dispatch) => {
  try {
    const { data } = await api.getBatchEvent(batchCode);

    dispatch({ type: GET_BATCH_EVENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const uploadAttendance = (attendanceRecord) => async (dispatch) => {
  try {
    const { data } = await api.uploadAttendance(attendanceRecord);
    alert("Attendance Uploaded Successfully");
    dispatch({ type: UPLOAD_ATTENDANCE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAttendance = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAttendance(formData);
    dispatch({ type: GET_ATTENDANCE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAttendanceStatus = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAttendanceStatus(formData);
    dispatch({ type: GET_ATTENDANCE_STATUS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAttendanceByBatchCodes = (allBatches) => async (dispatch) => {
  try {
    const { data } = await api.getAttendanceByBatchCodes(allBatches);
    // console.log("data", data);
    dispatch({ type: GET_ATTENDANCE_BY_BATCH_CODES, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addAssignment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAssignment(formData);
    alert("Assignment Added Successfully");
    dispatch({ type: ADD_ASSIGNMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getStudentByAssignmentCode =
  (assignmentCode) => async (dispatch) => {
    try {
      const { data } = await api.getStudentByAssignmentCode(assignmentCode);
      dispatch({ type: GET_STUDENT_BY_ASSIGNMENT_CODE, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const addScore = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addScore(formData);
    alert("Marks Added Successfully");
    dispatch({ type: ADD_SCORE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getEventByCourseCode = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getEventByCourseCode(formData);

    dispatch({ type: GET_EVENT_BY_COURSE_CODE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateCourseData = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourseData(formData);
    alert("Course Data Updated Successfully");
    dispatch({ type: UPDATE_COURSE_DATA, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAdminDashboardDataBySubAdmin =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.getAdminDashboardDataBySubAdmin(formData);
      dispatch({ type: DASHBOARD_DATA, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
export const getAdminDashboardDataByOrganizationName =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.getAdminDashboardDataByOrganizationName(
        formData
      );
      dispatch({ type: DASHBOARD_DATA, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
export const getAllAdminDashboardData = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAdminDashboardData();
    dispatch({ type: DASHBOARD_DATA, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateStatus = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStatus(formData);
    alert("Batch Status Updated Successfully");
    dispatch({ type: UPDATE_STATUS, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateBatchAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateBatchAdmin(formData);
    alert("Batch Admin Updated Successfully");
    dispatch({ type: UPDATE_BATCH_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
