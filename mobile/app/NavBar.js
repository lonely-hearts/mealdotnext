// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Button from './Button';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width,
    height: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const NavBar = (props) => {
  if (props.navigator.getCurrentRoutes().length > 1) {
    return (
      <View style={styles.container}>
        <Button text="Meals" onclick={() => moveTo(props.navigator, MealList)} />
        <Button text="Shop" onclick={() => moveTo(props.navigator, ShoppingList)} />
        <Button text="Add" onclick={() => moveTo(props.navigator, AddMeal)} />
      </View>
    );
  }
  return null;
};

export default NavBar;
