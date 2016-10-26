import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';
import MealList from './MealList';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mealList: []
		}
	}

	updateMealList(meals) {
		console.log('update meal list', meals);
		this.setState({
			mealList: meals
		})
	}

	render() {
		if (this.props.page === 'MealList') {
			return <MealList userId={this.props.userId} token={this.props.token} update={this.updateMealList.bind(this)}/>
		} else if (this.props.page === 'AddMeal') {
			return <AddMeal userId={this.props.userId} token={this.props.token}/>
		} else if (this.props.page === 'ShoppingList') {
			return <ShoppingList userId={this.props.userId} token={this.props.token} mealList={this.state.mealList}/>
		}
	}
}