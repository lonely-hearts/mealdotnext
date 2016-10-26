
import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Button from './Button';

var width = Dimensions.get('window').width;

export default class NavBar extends React.Component {
	render() {
		return (
				<View style={styles.container}>
					<Button text='Meals' onclick={() => this.props.changePage('MealList')}/>
					<Button text='Shop' onclick={() => this.props.changePage('ShoppingList')}/>
					<Button text='Add' onclick={() => this.props.changePage('AddMeal')}/>
				</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		width: width,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	}
});