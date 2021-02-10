import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import DefaultStyles from "../constants/default-styles.js";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CurrencySelector from "../components/CurrencySelector";
import CurrencySymbol from "../components/CurrencySymbol";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { dinerosRequest } from "../store/actions/dineros";
import { currencyRequest } from "../store/actions/currency";
import { convertFromTo } from "../components/ConverterFunctions";
import { getMovementRequest } from "../store/actions/movement";
import CustomButton from "../components/CustomButton";
MainScreen = (props) => {
  dispatch = useDispatch();

  const [currency, setCurrency] = React.useState(0);

  const availableDineros = useSelector((state) => state.dineros);

  const { loading, error, dineros } = availableDineros;
  const [update, setUpdate] = React.useState(false);
  React.useEffect(() => {
    dispatch(dinerosRequest());

    dispatch(currencyRequest());
    dispatch(getMovementRequest());
  }, [dispatch, update]);

  const availableCurrencies = useSelector((state) => state.currency);
  const { loadingurrency, errorCurrency, exchangeRates } = availableCurrencies;

  const [euros, setEuros] = React.useState(0);
  const [pesos, setPesos] = React.useState(0);
  const [dolares, setDolares] = React.useState(0);
  const [coronas, setCoronas] = React.useState(dineros.dineroTotal);

  const handleUpdate = () => {
    setTimeout(() => {
      setUpdate(!update);
    }, 1000);
  };
  React.useEffect(() => {
    if (exchangeRates.rates) {
      const conv = convertFromTo(exchangeRates.rates, dineros.dineroTotal, 0);
      setCoronas(conv[0]);
      setPesos(conv[1]);
      setEuros(conv[2]);
      setDolares(conv[3]);
    }
  }, [dineros, exchangeRates, update]);

  const movementsInfo = useSelector((state) => state.getMovements);

  const { loadingMovements, errorMovements, movements } = movementsInfo;

  return (
    <View>
      {loading ? (
        <Text>Cargando ...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={DefaultStyles.screen}>
            <Card>
              <Text style={DefaultStyles.subTitle}>Disponible</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate({
                    routeName: "MoneyDetail",
                    params: { dineros: dineros },
                  })
                }
              >
                <View style={styles.money}>
                  <NumberFormat
                    renderText={(text) => (
                      <Text style={DefaultStyles.title}>{text}</Text>
                    )}
                    value={
                      currency === 0
                        ? coronas
                        : currency === 1
                        ? pesos
                        : currency === 2
                        ? euros
                        : dolares
                    }
                    decimalScale={2}
                    displayType={"text"}
                    thousandSeparator={true}
                    d
                  />

                  <CurrencySymbol currency={currency} />
                </View>
              </TouchableOpacity>
              <CurrencySelector currency={currency} setCurrency={setCurrency} />
            </Card>

            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <CustomButton
                  color="red"
                  title="Agregar Gastos"
                  onPress={() =>
                    props.navigation.navigate({
                      routeName: "Form",
                      params: { type: "Gasto", handleUpdate: handleUpdate },
                    })
                  }
                />
              </Card>
              <Card style={styles.card}>
                <CustomButton
                  color="green"
                  title="Agregar Ingreso"
                  onPress={() =>
                    props.navigation.navigate({
                      routeName: "Form",
                      params: { type: "ingreso", handleUpdate: handleUpdate },
                    })
                  }
                />
              </Card>
            </View>

            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <CustomButton
                  title="Ver Movimientos"
                  onPress={() =>
                    props.navigation.navigate({
                      routeName: "Movements",
                      params: {
                        movements: movements,
                        loading: loadingMovements,
                      },
                    })
                  }
                  color={Colors.secondary}
                />
              </Card>
              <Card style={styles.card}>
                <CustomButton
                  titleStyle={{
                    fontSize: 50,
                  }}
                  title="Convertidor Rapido"
                  onPress={() =>
                    props.navigation.navigate({ routeName: "Converter" })
                  }
                  color={Colors.secondary}
                />
              </Card>
            </View>
            <View>
              <Text>
                Ultima actualizacion de las tasas {exchangeRates.date}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: "Dineros",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
};
const styles = StyleSheet.create({
  money: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: "40%",
    padding: 5,
    marginRight: 10,
  },
  cardContainer: {
    padding: Dimensions.get("window").height / 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MainScreen;
