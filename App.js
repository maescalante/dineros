import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "./components/Header";
import MainScreen from "./screens/MainScreen";
import DinerosNavigator from "./navigation/DinerosNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react/cjs/react.development";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { dinerosReducer, updateDinerosReducer } from "./store/reducers/dineros";
import { movementReducer, getMovementReducer } from "./store/reducers/movement";
import { currencyReducer } from "./store/reducers/currency";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { getMovementDetail } from "./store/reducers/movement";

const rootReducer = combineReducers({
  dineros: dinerosReducer,
  currency: currencyReducer,
  movement: movementReducer,
  updateDineros: updateDinerosReducer,
  getMovements: getMovementReducer,
  getMovementDetail: getMovementDetail,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <DinerosNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
