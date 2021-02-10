import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import DefaultStyles from "../constants/default-styles";
const Header = (props) => {
  return (
    <View style={{ ...styles.header, backgroundColor: props.color }}>
      <Text style={{ ...DefaultStyles.headerText, color: props.textColor }}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
export default Header;
