import {
  CURRENCY_REQUEST,
  CURRENCY_REQUEST_SUCCESS,
  CURRENCY_REQUEST_FAIL,
} from "../constants/currency";

export const currencyReducer = (state = { exchangeRates: {} }, action) => {
  switch (action.type) {
    case CURRENCY_REQUEST:
      return { loadingCurrency: true, exchangeRates: {} };
    case CURRENCY_REQUEST_SUCCESS:
      return { loadingCurrency: false, exchangeRates: action.payload };
    case CURRENCY_REQUEST_FAIL:
      return { loadingCurrency: false, errorCurrency: action.payload };
    default:
      return state;
  }
};
