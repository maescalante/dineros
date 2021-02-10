import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "80%",
    maxWidth: "95%",
    // minWidth: 300,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: Dimensions.get("window").height / 30,
    borderRadius: 10,
  },
});
export default Card;