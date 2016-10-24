import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ingredient from './Ingredient.js';

export default class ShoppingList extends React.Component {
  render() {
    return (
      <Text>{this.props.name}</Text>
    );
  }
}