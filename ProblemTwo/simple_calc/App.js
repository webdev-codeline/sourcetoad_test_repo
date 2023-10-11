import { StyleSheet, Text, SafeAreaView } from 'react-native';
import CalculatorScreen from './components/screens/CalculatorScreen';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CalculatorScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
