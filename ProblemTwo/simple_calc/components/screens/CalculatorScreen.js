import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CalculatorScreen = () => {
  const [calculatorDisplay, setCalculatorDisplay] = useState('');
  const [calculatorSum, setCalculatorSum] = useState('');
  const [calculatorExpression, setCalculatorExpression] = useState('');

  const handleButtonPress = (buttonValue) => {
    switch (buttonValue) {
      case '=':
        try {
          const result = new Function(
            'return ' +
              calculatorExpression.replace('÷', '/').replace('%', '/100')
          )();
          setCalculatorSum(result.toString());
        } catch (error) {
          setCalculatorDisplay('Error');
        }
        break;
      case 'AC':
        setCalculatorDisplay('');
        setCalculatorExpression('');
        setCalculatorSum('');
        break;
      case '+/-':
        var isNegative = calculatorDisplay.startsWith('-');
        setCalculatorDisplay(
          isNegative ? calculatorDisplay.slice(1) : '-' + calculatorDisplay
        );
        setCalculatorExpression(
          isNegative
            ? calculatorExpression.slice(1)
            : '-' + calculatorExpression
        );
        break;
      default:
        setCalculatorExpression(
          (prevExpression) => `${prevExpression}${buttonValue}`
        );
        setCalculatorDisplay((prevDisplay) => `${prevDisplay}${buttonValue}`);
    }
  };

  const actionButtons = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const actions1 = ['÷', '*', '-', '+', '='];
  const actions2 = ['AC', '+/-', '%'];

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{calculatorDisplay}</Text>
        {calculatorSum && <Text style={styles.sum}>{calculatorSum}</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        {actionButtons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  buttonValue === '0' && {
                    flexBasis: '50%',
                    alignItems: 'flex-start',
                    paddingLeft: '12%',
                  },
                  actions1.includes(buttonValue)
                    ? styles.action1
                    : actions2.includes(buttonValue)
                    ? styles.action2
                    : styles.action3,
                ]}
                onPress={() => handleButtonPress(buttonValue)}>
                <Text
                  style={[
                    styles.buttonText,
                    !actions1.includes(buttonValue) && { color: 'black' },
                  ]}>
                  {buttonValue}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    backgroundColor: '#202020',
  },
  display: {
    fontSize: 48,
    color: 'white',
    overflowWrap: 'anywhere'
  },
  sum: {
    fontSize: 24,
    color: 'white',
  },

  buttonsContainer: {
    flex: 7,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flexBasis: '25%',
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#838687',
    borderBottomWidth: 1,
    borderBottomColor: '#838687',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 500,
  },
  action1: {
    backgroundColor: '#f98d12',
    color: 'white',
  },
  action2: {
    backgroundColor: '#D2D3D5',
    color: 'black',
  },
  action3: {
    backgroundColor: '#D7D7D9',
    color: 'black',
  },
});

export default CalculatorScreen;
