import { GET_PRESIGNED_URL, SET_ERRORS } from "../actionTypes";
import * as api from "../api";
export const getPresignedUrl = (formData) => async (dispatch) => {
  try {
    console.log("formDataImage", formData);
    const { data } = await api.getPresignedUrl(formData);

    dispatch({ type: GET_PRESIGNED_URL, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
