import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import LogoDisplay from './LogoDisplay';
import Column from './Column';

const width = Dimensions.get('window').width;

const compileList = (meals) => {
  const result = {};
  const list = [];
  const recipes = meals.map(meal => meal.recipe);

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.food in result) {
        result[ingredient.food].quantity += ingredient.quantity;
      } else {
        result[ingredient.food] = {
          quantity: ingredient.quantity,
          measure: ingredient.measure,
        };
      }
    });
  });

  const ingredients = Object.keys(result);
  for (let i = 0; i < ingredients.length; i += 1) {
    const ingredient = ingredients[i];
    const amount = result[ingredient];
    list.push([ingredient, amount.quantity, amount.measure]);
  }
  return list;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  table: {
    width: width * 0.9,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
});

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.shoppingList = compileList(this.props.getMealList());
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoDisplay />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          <View style={styles.table}>
            <Column
              data={this.shoppingList}
              name="Ingredient"
              index={0}
            />
            <Column
              data={this.shoppingList}
              name="Qty"
              index={1}
              alignRight
            />
            <Column
              data={this.shoppingList}
              name="Unit"
              index={2}
              alignRight
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

