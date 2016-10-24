import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoDisplay from './app/LogoDisplay';
import sampleData from './assets/sampleData';
import ShoppingList from './app/ShoppingList';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ShoppingList ingredients={sampleData.hits[0].recipe.ingredientLines}/>
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
