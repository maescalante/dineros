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
import axios from "axios";
export const movementRequest = (
  valorEUR,
  valorUSD,
  valorCZK,
  valorCOP,
  motivo,
  medioPago,
  tipo,
  fecha
) => async (dispatch) => {
  try {
    dispatch({ type: MOVEMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://dineros-de437-default-rtdb.firebaseio.com/movimientos.json",
      {
        valorEUR,
        valorUSD,
        valorCZK,
        valorCOP,
        motivo,
        medioPago,
        tipo,
        fecha,
      },
      config
    );

    dispatch({ type: MOVEMENT_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVEMENT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovementRequest = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MOVEMENT_REQUEST });

    const { data } = await axios.get(
      "https://dineros-de437-default-rtdb.firebaseio.com/movimientos.json"
    );

    dispatch({ type: GET_MOVEMENT_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MOVEMENT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovementDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL });

    const { data } = await axios.get(
      `https://dineros-de437-default-rtdb.firebaseio.com/movimientos/${id}.json`
    );

    dispatch({ type: GET_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
