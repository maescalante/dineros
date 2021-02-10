import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import CurrencySelector from "../components/CurrencySelector";
import CurrencySymbol from "../components/CurrencySymbol";
import Icon from "../components/Icon";
import DefaultStyles from "../constants/default-styles.js";
import NumberFormat from "react-number-format";
import { cambiarDinerosRequest } from "../store/actions/dineros";
import { movementRequest } from "../store/actions/movement";
import { useSelector, useDispatch } from "react-redux";
import { convertFromTo } from "../components/ConverterFunctions";

const FormScreen = (props) => {
  dispatch = useDispatch();
  const [currency, setCurrency] = React.useState(0);

  const [paymentMethod, setPaymentMethod] = React.useState(0);
  const type = props.navigation.getParam("type");

  const [valor, setValor] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const availableDineros = useSelector((state) => state.dineros);
  const availableCurrencies = useSelector((state) => state.currency);
  const { loadingurrency, errorCurrency, exchangeRates } = availableCurrencies;
  const { loading, error, dineros } = availableDineros;

  const handleSubmit = () => {
    if (valor === "" || motivo === "") {
      Alert.alert("Faltan Campos", "Debes ingresar valor y motivo", [
        { text: "okay" },
      ]);
    } else {
      const valNumber = parseFloat(valor);
      const convertedVals = convertFromTo(
        exchangeRates.rates,
        valNumber,
        currency
      );

      var anterior;
      if (paymentMethod === 0) {
        anterior = dineros.dineroEfectivo;
      } else if (paymentMethod === 1) {
        anterior = dineros.dineroVisaMale;
      } else if (paymentMethod == 2) {
        anterior = dineros.dineroMasterMale;
      } else {
        anterior = dineros.dineroMasterCasti;
      }
      var anteriorTotal = dineros.dineroTotal;
      var d = new Date();
      var fecha = d.toString();
      dispatch(
        movementRequest(
          convertedVals[2],
          convertedVals[3],
          convertedVals[0],
          convertedVals[1],
          motivo,
          paymentMethod,
          type,
          fecha
        )
      );

      if (paymentMethod === 0) {
        dispatch(
          cambiarDinerosRequest(
            type,
            anteriorTotal,
            anterior,
            "dineroEfectivo",
            convertedVals[0]
          )
        );
      } else if (paymentMethod === 1) {
        dispatch(
          cambiarDinerosRequest(
            type,
            anteriorTotal,
            anterior,
            "dineroVisaMale",
            convertedVals[0]
          )
        );
      } else if (paymentMethod === 2) {
        dispatch(
          cambiarDinerosRequest(
            type,
            anteriorTotal,
            anterior,
            "dineroMasterMale",
            convertedVals[0]
          )
        );
      } else {
        dispatch(
          cambiarDinerosRequest(
            type,
            anteriorTotal,
            anterior,
            "dineroMasterCasti",
            convertedVals[0]
          )
        );
      }

      setValor("");
      setMotivo("");

      //console.log(props.navigation.state);
      const updateFunc = props.navigation.state.params["handleUpdate"];
      updateFunc();
      props.navigation.goBack();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={DefaultStyles.screen}>
        <View style={DefaultStyles.field}>
          <Text style={DefaultStyles.inputTitle}>Valor</Text>
          <View style={DefaultStyles.container}>
            <Input
              style={DefaultStyles.input}
              keyboardType="numbers-and-punctuation"
              value={valor}
              onChangeText={(text) => setValor(text)}
            />

            <CurrencySymbol currency={currency} />
          </View>
          <NumberFormat
            renderText={(text) => (
              <Text style={DefaultStyles.input}>{text}</Text>
            )}
            value={parseFloat(valor)}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
          />
        </View>

        <CurrencySelector currency={currency} setCurrency={setCurrency} />
        <View style={DefaultStyles.field}>
          <Text style={DefaultStyles.inputTitle}>Motivo</Text>
          <Input
            style={DefaultStyles.input}
            value={motivo}
            onChangeText={(text) => setMotivo(text)}
          />
        </View>

        <View style={DefaultStyles.field}>
          <Text style={DefaultStyles.inputTitle}>Medio de Pago</Text>
          <View style={DefaultStyles.container}>
            <Image
              source={require("../data/images/both.jpg")}
              style={DefaultStyles.tinyLogo}
            />
            <Image
              source={require("../data/images/yo.jpg")}
              style={DefaultStyles.tinyLogo}
            />
            <Image
              source={require("../data/images/casti.jpg")}
              style={DefaultStyles.tinyLogo}
            />
          </View>
          <View style={DefaultStyles.container}>
            <View>
              <Icon
                onSelect={setPaymentMethod}
                id={0}
                current={paymentMethod}
                dir={require("../data/images/efectivo.png")}
              ></Icon>
            </View>
            <View>
              <Icon
                id={1}
                current={paymentMethod}
                onSelect={setPaymentMethod}
                dir={require("../data/images/visa.png")}
              ></Icon>
              <Icon
                id={2}
                current={paymentMethod}
                onSelect={setPaymentMethod}
                dir={require("../data/images/master.jpg")}
              ></Icon>
            </View>

            <View>
              <Icon
                onSelect={setPaymentMethod}
                id={3}
                current={paymentMethod}
                dir={require("../data/images/master.jpg")}
              ></Icon>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title={type === "Gasto" ? "Agregar Gasto" : "Agregar Ingreso"}
            color={type === "Gasto" ? Colors.negative : Colors.positive}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

FormScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle:
      navigationData.navigation.getParam("type") === "Gasto"
        ? "Agregar Gasto"
        : "Agregar Ingreso",

    headerStyle: {
      backgroundColor:
        navigationData.navigation.getParam("type") === "Gasto"
          ? Colors.negative
          : Colors.positive,
    },
    headerTintColor: "#fff",
  };
};
const styles = StyleSheet.create({
  button: {
    padding: Dimensions.get("window").height / 30,
  },
});

export default FormScreen;
