import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import LogoDisplay from './app/LogoDisplay';
import sampleData from './assets/sampleData';
import ShoppingList from './app/ShoppingList';
import MealTile from './app/MealTile';
import MealList from './app/MealList';
import HeadBuffer from './app/HeadBuffer';
import Searchbar from './app/Searchbar';

class App extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <HeadBuffer />
        <LogoDisplay />
        <Searchbar />
        <MealList />
      </View>
    );
  }
}

Exponent.registerRootComponent(App);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1
  },
});