import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigationStack";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
