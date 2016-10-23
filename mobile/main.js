import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoDisplay from './app/LogoDisplay';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Work Plz</Text>
        <LogoDisplay />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
