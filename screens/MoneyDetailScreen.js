import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import NumberFormat from "react-number-format";
import CurrencySelector from "../components/CurrencySelector";
import Header from "../components/Header";
import Colors from "../constants/Colors";
import { convertFromTo } from "../components/ConverterFunctions";

const MoneyDetailScreen = (props) => {
  const dineros = props.navigation.getParam("dineros");

  const [currency, setCurrency] = React.useState(0);
  const availableCurrencies = useSelector((state) => state.currency);
  const { loadingurrency, errorCurrency, exchangeRates } = availableCurrencies;

  const [dineroTotal, setDineroTotal] = React.useState([dineros.dineroTotal]);

  const [dineroEfectivo, setDineroEfectivo] = React.useState([
    dineros.dineroEfectivo,
  ]);

  const [dineroVisaMale, setDineroVisaMale] = React.useState([
    dineros.dineroVisaMale,
  ]);
  const [dineroMasterMale, setDineroMasterMale] = React.useState([
    dineros.dineroMasterMale,
  ]);

  const [dineroMasterCasti, setDineroMasterCasti] = React.useState([
    dineros.dineroMasterCasti,
  ]);

  React.useEffect(() => {
    setDineroTotal(convertFromTo(exchangeRates.rates, dineros.dineroTotal, 0));
    setDineroVisaMale(
      convertFromTo(exchangeRates.rates, dineros.dineroVisaMale, 0)
    );
    setDineroMasterMale(
      convertFromTo(exchangeRates.rates, dineros.dineroMasterMale, 0)
    );
    setDineroMasterCasti(
      convertFromTo(exchangeRates.rates, dineros.dineroMasterCasti, 0)
    );
    setDineroEfectivo(
      convertFromTo(exchangeRates.rates, dineros.dineroEfectivo, 0)
    );
  }, [currency, dineros]);
  return (
    <ScrollView>
      <View style={DefaultStyles.screen}>
        <CurrencySelector currency={currency} setCurrency={setCurrency} />

        <View style={styles.item}>
          <Card>
            <Text style={(DefaultStyles.subtitle, { fontWeight: "bold" })}>
              Dinero Total:
            </Text>
            <NumberFormat
              renderText={(text) => (
                <Text style={DefaultStyles.input}>{text}</Text>
              )}
              value={
                currency === 0
                  ? dineroTotal[0]
                  : currency === 1
                  ? dineroTotal[1]
                  : currency === 2
                  ? dineroTotal[2]
                  : dineroTotal[3]
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </Card>
        </View>
        <View style={styles.item}>
          <Card>
            <Text style={(DefaultStyles.subtitle, { fontWeight: "bold" })}>
              Dinero Efectivo:
            </Text>
            <NumberFormat
              renderText={(text) => (
                <Text style={DefaultStyles.input}>{text}</Text>
              )}
              value={
                currency === 0
                  ? dineroEfectivo[0]
                  : currency === 1
                  ? dineroEfectivo[1]
                  : currency === 2
                  ? dineroEfectivo[2]
                  : dineroEfectivo[3]
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </Card>
        </View>
        <View style={styles.item}>
          <Card>
            <Text style={(DefaultStyles.subtitle, { fontWeight: "bold" })}>
              Dinero Visa Male:
            </Text>
            <NumberFormat
              renderText={(text) => (
                <Text style={DefaultStyles.input}>{text}</Text>
              )}
              value={
                currency === 0
                  ? dineroVisaMale[0]
                  : currency === 1
                  ? dineroVisaMale[1]
                  : currency === 2
                  ? dineroVisaMale[2]
                  : dineroVisaMale[3]
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </Card>
        </View>
        <View style={styles.item}>
          <Card>
            <Text style={(DefaultStyles.subtitle, { fontWeight: "bold" })}>
              Dinero Master Male:
            </Text>
            <NumberFormat
              renderText={(text) => (
                <Text style={DefaultStyles.input}>{text}</Text>
              )}
              value={
                currency === 0
                  ? dineroMasterMale[0]
                  : currency === 1
                  ? dineroMasterMale[1]
                  : currency === 2
                  ? dineroMasterMale[2]
                  : dineroMasterMale[3]
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </Card>
        </View>
        <View style={styles.item}>
          <Card>
            <Text style={(DefaultStyles.subtitle, { fontWeight: "bold" })}>
              Dinero Master Casti:
            </Text>
            <NumberFormat
              renderText={(text) => (
                <Text style={DefaultStyles.input}>{text}</Text>
              )}
              value={
                currency === 0
                  ? dineroMasterCasti[0]
                  : currency === 1
                  ? dineroMasterCasti[1]
                  : currency === 2
                  ? dineroMasterCasti[2]
                  : dineroMasterCasti[3]
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};
MoneyDetailScreen.navigationOptions = {
  headerTitle: "Detalle Dineros",
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: "#fff",
};
const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
});
export default MoneyDetailScreen;
