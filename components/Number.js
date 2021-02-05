import React from "react";
import { View, Text, StyleSheet, ImagePropTypes } from "react-native";
import colors from "../constants/colors";

const Number = (props) => {
  return (
    <View style={styles.conatainer}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    marginVertical: 10,
    borderWidth: 6,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: colors.secondary,
    fontSize: 22,
  },
});
export default Number;
