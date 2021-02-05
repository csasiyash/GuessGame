import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Number from '../components/Number';
import Statement from '../components/Statement';
import Icon from 'react-native-vector-icons/Ionicons';
//import {Ionicons} from 'react-native-vector-icons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (value, numOfRounds) => (
  <View key={value} style={styles.listItemContainer}>
    <Statement>#{numOfRounds}</Statement>
    <Statement>{value}</Statement>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPassGuesses] = useState([initialGuess]);
  const currentLow = useRef(1); //these wont be regenerated again when components are rendered
  const currentHigh = useRef(100); //will be initialised with the previous value

  const {userChoice, onGameOver} = props; //object destructuring
  //now we can write just userChoice instead of props.userChoice
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  //useEffect will run updateLayout function when it listens a change in Dimensions. Return function runs before the whole useEffect function and it helps in removing any previous add listener activities
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  //useEffect runs in every render cycle but after all components have run
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]); //if any changes in these elements then only useEffect will run

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You Know, this is wrong guess..', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') currentHigh.current = currentGuess;
    else currentLow.current = currentGuess + 1;

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPassGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Statement>Opponent's Guess</Statement>
        <View style={styles.smallContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Icon name="md-remove" size={24} color="white" />
          </MainButton>
          <Number>{currentGuess}</Number>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Icon name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.listItem}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index),
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Statement>Opponent's Guess</Statement>
      <Number>{currentGuess}</Number>
      <Card style={styles.button}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="md-add" size={24} color="white" />
        </MainButton>
      </Card>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.listItem}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  smallContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
  },
  listItemContainer: {
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    width: '100%',
  },

  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1,
  },

  listItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default GameScreen;
