import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Number from '../components/Number';
import Statement from '../components/Statement';
import colors from '../constants/colors';

const GameOverScreen = (props) => {
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );

  useRef(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        {/* <Card style={styles.screen}> */}
        <Statement>Game is Over</Statement>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            // source={{
            //   uri:
            //     'https://lh3.googleusercontent.com/proxy/7bJ2YK3XmLW82u8wjRpL5U_o1iB6BaDvYGkE9BPCx2qtM6M04JiQiXrvPuzjcBIE0NEPpmL5aQUFdwrWk_29IQLtl_KX8S0vvrUIm21ZuP4tDfl-U34ChfzvpIR7',
            // }}//image from net
            style={styles.image}
            resizeImage="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <Statement>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess
            the number <Text style={styles.highlight}>{props.userNumber}</Text>
          </Statement>
        </View>

        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        {/* </Card> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 4,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: colors.primary,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
});

export default GameOverScreen;
