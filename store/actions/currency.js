import axios from "axios";
import {
  CURRENCY_REQUEST,
  CURRENCY_REQUEST_SUCCESS,
  CURRENCY_REQUEST_FAIL,
} from "../constants/currency";

export const currencyRequest = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENCY_REQUEST });
    const { data } = await axios.get(
      "http://data.fixer.io/api/latest?access_key=d8a84717c12a5d697e2f96c4dd5af725&symbols=USD,EUR,COP,CZK"
    );

    dispatch({
      type: CURRENCY_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
