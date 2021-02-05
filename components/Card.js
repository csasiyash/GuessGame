import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View> //take out card properties and pass and merge with style property and also overide the card property if needed
  ); //props.children means everything contained in that prop element buttons textinput views everything are its children
};

const styles = StyleSheet.create({
  card: {
    // shadowColor: "black",
    // shadowOffset: { width: 2, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.8, //for IOS
    elevation: 9,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
