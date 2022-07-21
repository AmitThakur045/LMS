import { GET_PRESIGNED_URL } from "../actionTypes";

const initialState = {
  presignedUrl: "",
};

const awsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRESIGNED_URL:
      return { ...state, presignedUrl: action.payload };
    default:
      return state;
  }
};

export default awsReducer;
