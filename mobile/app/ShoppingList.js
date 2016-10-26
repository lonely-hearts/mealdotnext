import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import Ingredient from './Ingredient.js';
import LogoDisplay from './LogoDisplay';
import Column from './Column';

var width = Dimensions.get('window').width;

export default class ShoppingList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      shoppingList: []
    };
  }

  componentWillMount() {
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
        <ScrollView contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={true}>
          <View style={styles.table}>
            <Column 
              data={this.state.shoppingList} 
              name='Ingredient'
              index={0} 
            />
            <Column 
              data={this.state.shoppingList} 
              name='Qty'
              index={1} 
              alignRight={true}
            />
            <Column 
              data={this.state.shoppingList} 
              name='Unit'
              index={2} 
              alignRight={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
