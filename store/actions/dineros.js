import axios from "axios";
import {
  DINEROS_REQUEST,
  DINEROS_REQUEST_SUCCESS,
  DINEROS_REQUEST_FAIL,
  UPDATE_DINEROS_REQUEST,
  UPDATE_DINEROS_REQUEST_SUCCESS,
  UPDATE_DINEROS_REQUEST_FAIL,
} from "../constants/dineros";

export const dinerosRequest = () => async (dispatch) => {
  try {
    dispatch({ type: DINEROS_REQUEST });
    const { data } = await axios.get(
      "https://dineros-de437-default-rtdb.firebaseio.com/dineros.json"
    );

    dispatch({ type: DINEROS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DINEROS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cambiarDinerosRequest = (
  tipo,
  anteriorValorTotal,
  anteriorValor,
  medioPago,
  valor
) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DINEROS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const newValMedio =
      tipo === "Gasto" ? anteriorValor - valor : anteriorValor + valor;

    const { data } = await axios.put(
      `https://dineros-de437-default-rtdb.firebaseio.com/dineros/${medioPago}.json`,
      JSON.stringify(newValMedio),
      config
    );

    dispatch({ type: UPDATE_DINEROS_REQUEST_SUCCESS, payload: data });

    dispatch({ type: UPDATE_DINEROS_REQUEST });

    const newValTotal =
      tipo === "Gasto"
        ? anteriorValorTotal - valor
        : anteriorValorTotal + valor;
    const { data2 } = await axios.put(
      `https://dineros-de437-default-rtdb.firebaseio.com/dineros/dineroTotal.json`,

      JSON.stringify(newValTotal),
      config
    );

    dispatch({ type: UPDATE_DINEROS_REQUEST_SUCCESS, payload: data2 });
  } catch (error) {
    dispatch({
      type: UPDATE_DINEROS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
  }
};
