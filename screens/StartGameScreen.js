import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard, //api
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import Number from '../components/Number';
import Statement from '../components/Statement';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredvalue] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4,
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const inputHandler = (inputText) => {
    setEnteredvalue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredvalue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Enter Number between 1 to 99', [
        {text: 'Okay', style: 'cancel', onPress: resetInputHandler},
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredvalue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summary}>
        <Statement>You Selected</Statement>
        <Number>{selectedNumber}</Number>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        {/*helps to shift the input field by some pixels while keyboard is launched */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContaier}>
              <Statement>Select a Number</Statement>
              <Input
                style={styles.input}
                maxLength={2}
                keyboardType="numeric"
                onChangeText={inputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    color={Colors.secondary}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center', //for cross axis - horizontally
  },
  inputContaier: {
    marginTop: Dimensions.get('window').height / 50,
    minWidth: 200,
    width: '80%',

    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderTopEndRadius: 13,
    fontFamily: 'OpenSans-BoldItalic',
  },
  // button: {
  //   width: Dimensions.get('window').width / 4, //similar to width='25%'//Dimensions attribute gets called only when a[pp starts
  //   //width: 80,
  // },
  input: {
    width: 60,
    height: 50,
    textAlign: 'center',
  },
  summary: {
    marginTop: Dimensions.get('window').height / 25,
    alignItems: 'center',
  },
});

export default StartGameScreen;
