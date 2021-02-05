import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Statement = (props) => {
  return (
    <Text style={{...styles.container, ...props.style}}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans-BoldItalic',
  },
});

export default Statement;
