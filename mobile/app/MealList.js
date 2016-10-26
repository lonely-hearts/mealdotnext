import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';

const userUrl = 'https://mealdotnext4.herokuapp.com/api/user/';
const mealUrl = 'https://mealdotnext4.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
});

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: { mealsObjs: [] },
      displayInfo: false,
      currentRecipe: {},
      currentMeal: 0,
    };
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(userUrl + this.props.getUserId(), { method: 'GET', headers: { 'x-access-token': this.props.getToken() } })
      .then(res => res.json())
      .then((data) => {
        this.props.updateMealList(data.mealsObjs.map(meal => meal.recipe));
        this.setState({
          fetchData: data,
        });
      }).done();
  }

  postMeal() {
    fetch(mealUrl + this.state.currentMeal,
            { method: 'DELETE',
              headers: { 'x-access-token': this.props.getToken() } });
    this.setState({
      displayInfo: false,
      currentRecipe: {},
    }, this.getData);
  }

  gotoNext(recipe) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        hideInfo: this.hideInfo,
        postMeal: this.postMeal,
        text: 'Remove',
      },
    });
  }

  render() {
    if (this.state.displayInfo) {
      return (
        <InfoDisplay
          recipe={this.state.currentRecipe}
          postMeal={this.postMeal}
          text="Remove"
        />
      );
    }
    return (
      <View style={styles.container}>
        <LogoDisplay />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.state.fetchData.mealsObjs.map((meal, i) => (
            <MealTile
              recipe={meal.recipe}
              showInfo={this.gotoNext}
              key={i}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

