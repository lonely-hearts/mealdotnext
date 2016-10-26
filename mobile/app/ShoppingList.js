import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ingredient from './Ingredient.js';
import LogoDisplay from './LogoDisplay';

export default class ShoppingList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      shoppingList: []
    };
  }

  componentWillMount() {
    console.log('meals obj in shopping list: ', this.props.mealList);
  	this.setState({
      shoppingList: this.compileList(this.props.mealList) 
    });
  }

  compileList(data) {
  	var result = {};
  	var list = [];
  	data.forEach(recipe => {
  		recipe.ingredients.forEach(ingredient => {
  			if (ingredient.food in result) {
  				result[ingredient.food].quantity += ingredient.quantity;
  			}
  			else {
  				result[ingredient.food] = {
  					quantity: ingredient.quantity,
  					measure: ingredient.measure
  				}
  			}
  		})
  	})
  	for ( var ingredient in result) {
  		list.push([ingredient, result[ingredient].quantity, result[ingredient].measure])
  	}
  	return list;
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoDisplay />
      	{this.state.shoppingList.map( (ingredient, i) => (
      		<Text key={i}> {ingredient[0] + ': ' + ingredient[1] + ' ' + ingredient[2]} </Text>
      		))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

});
