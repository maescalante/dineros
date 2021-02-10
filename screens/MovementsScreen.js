import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import {
  FlatList,
  ScrollView,
  Item,
  TouchableOpacity,
} from "react-native-gesture-handler";
import DefaultStyles from "../constants/default-styles";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import { StyleSheet, Dimensions } from "react-native";
const MovementsScreen = (props) => {
  const movements = props.navigation.getParam("movements");
  const loading = props.navigation.getParam("loading");
  const dateToday = new Date().getMonth();
  const [gastosMes, setGastosMes] = useState(0);

  const [pressed, setPressed] = useState(false);
  const handleMes = () => {
    Object.entries(movements).forEach((mov) => {
      var mes = mov[1].fecha.split(" ")[1];
      if (dateToday === mes) {
        setGastosMes(gastosMes + mov.valorCOP);
      }
    });
    setPressed(true);
  };

  const handlePress = (key) => {
    props.navigation.navigate({
      routeName: "MovementDetail",
      params: {
        id: key,
      },
    });
  };
  return (
    <View
      style={{
        marginTop: Dimensions.get("window").height / 50,
      }}
    >
      <ScrollView style={{ padding: 10 }}>
        {Object.entries(movements).map((element) => {
          return (
            <TouchableOpacity
              key={element[0]}
              onPress={() => handlePress(element[0])}
            >
              <View
                style={{
                  alignSelf:
                    element[1].tipo === "Gasto" ? "flex-end" : "flex-start",
                }}
              >
                <Card
                  style={{
                    backgroundColor:
                      element[1].tipo === "Gasto"
                        ? Colors.negative
                        : Colors.positive,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      width: Dimensions.get("window").width / 2,
                    }}
                  >
                    {element[1].motivo}
                  </Text>
                </Card>
              </View>
            </TouchableOpacity>
          );
        })}
        <Button onPress={handleMes} title="ver gastos mes" />
        {pressed && (
          <View style={{ alignItems: "center" }}>
            <Text>{gastosMes}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

MovementsScreen.navigationOptions = {
  headerTitle: "Movimientos",
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: "#fff",
};
export default MovementsScreen;
