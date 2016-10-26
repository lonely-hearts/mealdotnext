import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';
import MealList from './MealList';

export default class Home extends React.Component {
	render() {
		if (this.props.page === 'MealList') {
			return <MealList userId={this.props.userId}/>
		} else if (this.props.page === 'AddMeal') {
			return <AddMeal userId={this.props.userId}/>
		} else if (this.props.page === 'ShoppingList') {
			return <ShoppingList userId={this.props.userId}/>
		}
	}
}