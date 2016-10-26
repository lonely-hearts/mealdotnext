import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';
import MealList from './MealList';

export default class Home extends React.Component {
	render() {
		if (this.props.page === 'MealList') {
			return <MealList />
		} else if (this.props.page === 'AddMeal') {
			return <AddMeal />
		} else if (this.props.page === 'ShoppingList') {
			return <ShoppingList />
		}
	}
}