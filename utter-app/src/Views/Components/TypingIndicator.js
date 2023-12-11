import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const BouncingDot = ({ delay }) => {
  return (
    <Animatable.View
      animation="bounce"
      duration={1200}
      delay={delay}
      easing="ease-in-out" // Easing function
      iterationCount="infinite"
      useNativeDriver={true}
      style={styles.dot}
    />
  );
};

const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <BouncingDot delay={0} />
      <BouncingDot delay={400} />
      <BouncingDot delay={800} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "left",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5A5AF6",
    marginHorizontal: 3,
  },
});

export default TypingIndicator;
