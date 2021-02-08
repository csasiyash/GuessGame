import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={styles.headertTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 30,
    paddingBottom: 10,
    //backgroundColor: Platform.OS === 'android' ? 'skyblue' : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    //borderBottomWidth: Platform.OS === 'ios' ? 3 : 15,
    //borderBottomColor: Platform.OS === 'ios' ? black : 'grey',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 15,
    borderBottomColor: 'grey',
  },
  headertTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
    fontSize: 30,
    fontFamily: 'OpenSans-ExtraBold',
  },
});

export default Header;
