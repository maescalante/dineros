import React from "react";
import { Text, StyleSheet } from "react-native";
import DefaultStyles from "../constants/default-styles";
const CurrencySymbol = (props) => {
  const [moneySymbol, setMoneySymbol] = React.useState("Kc");

  React.useEffect(() => {
    if (props.currency === 0) {
      setMoneySymbol("Kc");
    } else if (props.currency === 1) {
      setMoneySymbol("COP");
    } else if (props.currency === 2) {
      setMoneySymbol("EUR");
    } else {
      setMoneySymbol("USD");
    }
  }, [props.currency]);
  return <Text style={DefaultStyles.subTitle}>{moneySymbol}</Text>;
};
const styles = StyleSheet.create({});
export default CurrencySymbol;
