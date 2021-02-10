import {
  DINEROS_REQUEST,
  DINEROS_REQUEST_SUCCESS,
  DINEROS_REQUEST_FAIL,
  UPDATE_DINEROS_REQUEST,
  UPDATE_DINEROS_REQUEST_SUCCESS,
  UPDATE_DINEROS_REQUEST_FAIL,
} from "../constants/dineros";

export const dinerosReducer = (state = { dineros: [] }, action) => {
  switch (action.type) {
    case DINEROS_REQUEST:
      return { loading: true, dineros: [] };
    case DINEROS_REQUEST_SUCCESS:
      return { loading: false, dineros: action.payload };
    case DINEROS_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateDinerosReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DINEROS_REQUEST:
      return { loading: true };
    case UPDATE_DINEROS_REQUEST_SUCCESS:
      return { loading: false, res: action.payload };
    case UPDATE_DINEROS_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
