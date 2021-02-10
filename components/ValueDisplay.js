import React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import CurrencySymbol from "../components/CurrencySymbol";
import NumberFormat from "react-number-format";
import DefaultStyles from "../constants/default-styles";
const ValueDisplay = (props) => {
  return (
    <View style={{ marginTop: 30 }}>
      <View style={DefaultStyles.container}>
        <Image style={styles.tinyLogo} source={props.image} />
        <View style={DefaultStyles.container}>
          <NumberFormat
            renderText={(text) => (
              <Text style={DefaultStyles.input}>{text}</Text>
            )}
            value={props.value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
          />
        </View>

        <CurrencySymbol currency={props.currency} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
    alignContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").height / 15,
    margin: 2,
  },
});
export default ValueDisplay;
