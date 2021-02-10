import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  screen: {
    marginTop: Dimensions.get("window").height / 30,
    alignItems: "center",
  },
  inputTitle: {
    fontSize: Dimensions.get("window").height / 40,

    alignSelf: "center",
  },
  input: {
    width: Dimensions.get("window").width / 2,
    fontSize: Dimensions.get("window").height / 40,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    marginRight: 10,
    alignContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").height / 10,
    margin: 2,
  },
  title: {
    fontSize: Dimensions.get("window").height / 30,
    marginVertical: 10,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: Dimensions.get("window").height / 40,
    marginVertical: 10,
  },
  field: {
    padding: 10,
  },
  headerText: {
    color: "black",
    fontSize: Dimensions.get("window").height / 20,
  },
  button: {},
});
