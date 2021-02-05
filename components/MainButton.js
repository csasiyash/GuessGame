import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.containerText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
  },
  containerText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
});

export default MainButton;
