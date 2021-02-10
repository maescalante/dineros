import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FormScreen from "../screens/FormScreen";
import ConverterScreen from "../screens/ConverterScreen";
import MovementsScreen from "../screens/MovementsScreen";
import MainScreen from "../screens/MainScreen";
import MoneyDetailScreen from "../screens/MoneyDetailScreen";
import MovementDetailScreen from "../screens/MovementDetailScreen";
const DinerosNavigator = createStackNavigator({
  Main: MainScreen,
  Form: FormScreen,
  Converter: ConverterScreen,
  Movements: MovementsScreen,
  MoneyDetail: MoneyDetailScreen,
  MovementDetail: MovementDetailScreen,
});

export default createAppContainer(DinerosNavigator);
