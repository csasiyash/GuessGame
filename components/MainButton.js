import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import colors from '../constants/colors';

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity; //the variable have firsr capital letter because jsx variables must have capital initials

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.containerText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
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
