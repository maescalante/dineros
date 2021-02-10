import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
const Flag = (props) => {
  const handlePress = () => {
    props.onSelect(props.id);
  };
  return (
    <View style={styles.flagContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={{
            ...styles.tinyLogo,
            borderColor: props.current === props.id ? "green" : "black",
            borderWidth: props.current === props.id ? 4 : 1,
          }}
          source={props.dir}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flagContainer: {
    padding: 2,
  },
  tinyLogo: {
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").height / 15,
    borderColor: "black",
    borderWidth: 1,
  },
});
export default Flag;
