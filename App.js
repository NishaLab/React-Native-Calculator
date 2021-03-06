import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CustomButton from './components/numpad';
import {evaluate} from 'mathjs';
const buttons = [
  ['CLEAR', 'DEL'],
  [7, 8, 9, '/'],
  [4, 5, 6, '*'],
  [1, 2, 3, '-'],
  ['%', 0, '+', '='],
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {display: '', operator: null, prevNum: '', curNum: ''};
  }
  delete = () => {
    let foo = this.state.display;
    if (this.isOperator(foo[foo.length - 1])) {
      this.setState({operator: null});
    }
    this.setState({display: this.state.display.slice(0, -1)});
  };

  handleInput = val => {
    switch (val) {
      case 'CLEAR':
        this.setState({display: '', operator: null});
        break;
      case 'DEL':
        this.delete();
        break;
      case '*':
      case '-':
      case '+':
      case '%':
      case '/':
        if (this.state.operator != null) {
          this.calculate(val);
          this.setState({operator: val});
        } else {
          this.setState({display: this.state.display + val, operator: val});
        }
        break;
      case '=':
        this.calculate();
        break;
      default:
        this.setState({display: this.state.display + val});
        break;
    }
  };
  isOperator = val => {
    return val === '+' || val === '-' || val === '*' || val === '/';
  };
  calculate(val) {
    let arr = this.state.display.split(this.state.operator);
    let num1 = evaluate(arr[0]);
    let num2 = evaluate(arr[1]);
    console.log(val);

    switch (this.state.operator) {
      case '+':
        this.setState({display: num1 + num2 + ''}, () => {
          if (this.isOperator(val)) {
            this.setState({display: this.state.display + val});
          }
        });
        break;
      case '-':
        this.setState({display: num1 - num2 + ''}, () => {
          if (this.isOperator(val)) {
            this.setState({display: this.state.display + val});
          }
        });
        break;
      case '*':
        this.setState({display: num1 * num2 + ''}, () => {
          if (this.isOperator(val)) {
            this.setState({display: this.state.display + val});
          }
        });
        break;
      case '/':
        this.setState({display: num1 / num2 + ''}, () => {
          if (this.isOperator(val)) {
            this.setState({display: this.state.display + val});
          }
        });
        break;
      case '%':
        this.setState({display: (num1 % num2) + ''}, () => {
          if (this.isOperator(val)) {
            this.setState({display: this.state.display + val});
          }
        });
        break;
      default:
        break;
    }
    this.setState({operator: null});
  }
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <CustomButton
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this, buttonItems)}
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
          <TextInput style={styles.resultText}>{this.state.display}</TextInput>
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
