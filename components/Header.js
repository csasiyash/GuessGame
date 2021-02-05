import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headertTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertTitle: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'OpenSans-ExtraBold',
  },
});

export default Header;
