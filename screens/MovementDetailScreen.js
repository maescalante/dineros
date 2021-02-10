import React from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getMovementDetail } from "../store/actions/movement";
import Header from "../components/Header";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/Colors";
import NumberFormat from "react-number-format";
const MovementDetailScreen = (props) => {
  dispatch = useDispatch();
  const key = props.navigation.getParam("id");

  React.useEffect(() => {
    dispatch(getMovementDetail(key));
  }, [dispatch]);
  const movementDetailInfo = useSelector((state) => state.getMovementDetail);

  const { loadingMovement, error, movement } = movementDetailInfo;

  return (
    <View style={DefaultStyles.screen}>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Motivo</Text>
      <Text style={DefaultStyles.subTitle}>{movement.motivo}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Fecha</Text>
      <Text style={DefaultStyles.subTitle}>{movement.fecha}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tipo</Text>
      <Text style={DefaultStyles.subTitle}>{movement.tipo}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Valor en Pesos</Text>
      <NumberFormat
        renderText={(text) => (
          <Text style={DefaultStyles.subtitle}>{text}</Text>
        )}
        value={movement.valorCOP}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
      />
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Valor en Coronas</Text>
      <NumberFormat
        renderText={(text) => (
          <Text style={DefaultStyles.subtitle}>{text}</Text>
        )}
        value={movement.valorCZK}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
      />
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Valor en Euros</Text>
      <NumberFormat
        renderText={(text) => (
          <Text style={DefaultStyles.subtitle}>{text}</Text>
        )}
        value={movement.valorEUR}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
      />
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Valor en Dolares</Text>
      <NumberFormat
        renderText={(text) => (
          <Text style={DefaultStyles.subtitle}>{text}</Text>
        )}
        value={movement.valorUSD}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
      />
      <Text style={{ fontWeight: "bold", fontSize: 15 }}>Medio de Pago</Text>
      <Text style={DefaultStyles.subTitle}>
        {movement.medioPago === 0
          ? "Efectivo"
          : movement.medioPago === 1
          ? "Visa Male"
          : movement.medioPago === 2
          ? "Master Male"
          : "Master Casti"}
      </Text>
    </View>
  );
};

MovementDetailScreen.navigationOptions = {
  headerTitle: "Resumen Movimientos",
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: "#fff",
};

export default MovementDetailScreen;
