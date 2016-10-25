import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MealList from './app/MealList';
import Searchbar from './app/Searchbar';

import HeadBuffer from './app/HeadBuffer';
import LogoDisplay from './app/LogoDisplay';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <HeadBuffer />
        <MealList tabLabel="Add" />
      </View>
    );
  }
}

Exponent.registerRootComponent(App);

