import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={{
          color: props.color,
          fontSize: Dimensions.get("screen").height / 35,
          textAlign: "center",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "white",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
