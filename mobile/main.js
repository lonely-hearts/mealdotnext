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

class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {sampleData.hits.map(item => (
          <MealTile recipe={item.recipe} />
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
});

Exponent.registerRootComponent(App);
