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

class App extends React.Component {
  render() {
    return (
      <MealList />
    );
  }
}

Exponent.registerRootComponent(App);
