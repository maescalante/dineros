import {
  MOVEMENT_REQUEST,
  MOVEMENT_REQUEST_SUCCESS,
  MOVEMENT_REQUEST_FAIL,
  GET_MOVEMENT_REQUEST,
  GET_MOVEMENT_REQUEST_SUCCESS,
  GET_MOVEMENT_REQUEST_FAIL,
  GET_DETAIL,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_FAIL,
} from "../constants/movement";

export const movementReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVEMENT_REQUEST:
      return { loading: true };
    case MOVEMENT_REQUEST_SUCCESS:
      return { loading: false, res: action.payload };
    case MOVEMENT_REQUEST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getMovementReducer = (state = { movements: [] }, action) => {
  switch (action.type) {
    case GET_MOVEMENT_REQUEST:
      return { loadingMovements: true, movements: [] };
    case GET_MOVEMENT_REQUEST_SUCCESS:
      return { loadingMovements: false, movements: action.payload };
    case GET_MOVEMENT_REQUEST_FAIL:
      return { loadingMovements: false, errorMovements: action.payload };
    default:
      return state;
  }
};

export const getMovementDetail = (state = { movement: {} }, action) => {
  switch (action.type) {
    case GET_DETAIL:
      return { loadingMovement: true, movement: {} };
    case GET_DETAIL_SUCCESS:
      return { loadingMovement: false, movement: action.payload };
    case GET_DETAIL_FAIL:
      return { loadingMovement: false, errorMovement: action.payload };
    default:
      return state;
  }
};
