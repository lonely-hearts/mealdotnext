import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Ingredient from './Ingredient.js';

var url = 'https://mealdotnext.herokuapp.com/api/meal/580fb932530bb17c05bc4142';

export default class ShoppingList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      shoppingList: []
    };
  }

  componentWillMount() {
  	fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
      	// console.log('DATA', data[0]);
      	var shoppingList = this.compileList(data.map(item => item.recipe));
        this.setState({
          shoppingList: shoppingList
        });
      }).done();
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
  	console.log(list);
  	return list;
  }

  render() {
    return (
      <View>
      	{this.state.shoppingList.map( (ingredient, i) => (
      		<Text key={i}> {ingredient[0] + ': ' + ingredient[1] + ' ' + ingredient[2]} </Text>
      		))}
      </View>
    );
  }
}
