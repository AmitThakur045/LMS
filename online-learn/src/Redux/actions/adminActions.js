import {
  ADD_ADMIN,
  GET_ADMIN,
  SET_ERRORS,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  ADD_COURSE,
  GET_COURSE,
  DELETE_COURSE,
} from "../actionTypes";
import * as api from "../api";

export const adminSignIn = (formData, navigate) => async (dispatch) => {
  try {
  } catch (error) {}
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
    navigate("/admin/admin/searchadmin");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteAdmin(formData);
    alert("Admin Deleted");
    dispatch({ type: DELETE_ADMIN, payload: true });
    dispatch({ type: GET_ADMIN, payload: {} });
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
