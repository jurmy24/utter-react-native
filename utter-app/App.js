import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigationStack";
import uuid from "react-native-uuid";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
