import React from "react";
import { View, Text, StyleSheet, Button, Keyboard } from "react-native";
import CurrencySelector from "../components/CurrencySelector";

import CurrencySymbol from "../components/CurrencySymbol";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import ValueDisplay from "../components/ValueDisplay";
import { copTo, euroTo, kcTo, usdTo } from "../components/ConverterFunctions";
import DefaultStyles from "../constants/default-styles.js";
import { convertFromTo } from "../components/ConverterFunctions";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
const ConverterScreen = () => {
  const [currency, setCurrency] = React.useState(0);
  const [value, setValue] = React.useState("0");

  const availableCurrencies = useSelector((state) => state.currency);
  const { loadingurrency, errorCurrency, exchangeRates } = availableCurrencies;

  const [euros, setEuros] = React.useState(0);
  const [pesos, setPesos] = React.useState(0);
  const [dolares, setDolares] = React.useState(0);
  const [coronas, setCoronas] = React.useState(0);

  const handleConvertir = () => {
    Keyboard.dismiss();
    var values = convertFromTo(
      exchangeRates.rates,
      parseFloat(value),
      currency
    );
    setValues(values);
  };

  const setValues = (list) => {
    setCoronas(list[0]);
    setPesos(list[1]);
    setEuros(list[2]);
    setDolares(list[3]);
  };
  return (
    <View style={DefaultStyles.screen}>
      <View style={DefaultStyles.field}>
        <Text style={DefaultStyles.inputTitle}>Valor</Text>
        <View style={DefaultStyles.container}>
          <Input
            style={DefaultStyles.input}
            keyboardType="numbers-and-punctuation"
            value={value}
            onChangeText={(text) => setValue(text)}
          />

          <CurrencySymbol currency={currency} />
        </View>
        <NumberFormat
          renderText={(text) => <Text style={DefaultStyles.input}>{text}</Text>}
          value={parseFloat(value)}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
        />
      </View>
      <CurrencySelector currency={currency} setCurrency={setCurrency} />

      <Button
        title="Convertir"
        color={Colors.secondary}
        onPress={handleConvertir}
      />

      <View>
        <ValueDisplay
          currency={0}
          value={coronas}
          image={require("../data/images/cz.jpg")}
        />
        <ValueDisplay
          currency={1}
          value={pesos}
          image={require("../data/images/col.jpg")}
        />
        <ValueDisplay
          currency={2}
          value={euros}
          image={require("../data/images/ger.jpg")}
        />

        <ValueDisplay
          currency={3}
          value={dolares}
          image={require("../data/images/usa.jpg")}
        />
      </View>
    </View>
  );
};

ConverterScreen.navigationOptions = {
  headerTitle: "Convertidor Rapido",
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: "#fff",
};
export default ConverterScreen;
