import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CustomButton from './components/numpad';

const buttons = [
  ['CLEAR', 'DEL', 'NEG', '%'],
  [7, 8, 9, '/'],
  [4, 5, 6, '*'],
  [1, 2, 3, '-'],
  ['.', 0, '+', '='],
];
class App extends Component {
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <CustomButton
            value={buttonItems}
            handleOnPress={() => {}}
            key={'btn-' + buttonIndex}
          />
        );
      });
      return (
        <View className="inputRow" key={'row-' + index} style={styles.inputRow}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  }
  render() {
    return (
      <View className="App" style={styles.App}>
        <View className="resContainer" style={styles.resContainer}>
          <TextInput style={styles.resultText}>456</TextInput>
        </View>
        <View className="inputContainer" style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  App: {
    flex: 1,
  },
  resContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#a8328e',
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#6b32a8',
  },
  resultText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default App;
