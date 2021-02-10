import React from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from "./Icon";

const CurrencySelector = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        id={0}
        current={props.currency}
        onSelect={props.setCurrency}
        dir={require("../data/images/cz.jpg")}
      ></Icon>
      <Icon
        id={1}
        current={props.currency}
        onSelect={props.setCurrency}
        dir={require("../data/images/col.jpg")}
      ></Icon>
      <Icon
        id={2}
        current={props.currency}
        onSelect={props.setCurrency}
        dir={require("../data/images/ger.jpg")}
      ></Icon>
      <Icon
        id={3}
        current={props.currency}
        onSelect={props.setCurrency}
        dir={require("../data/images/usa.jpg")}
      ></Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
export default CurrencySelector;
