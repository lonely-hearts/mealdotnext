import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';

const recipeUrl = 'https://mealdotnext4.herokuapp.com/api/recipe/';
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

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      searchString: '',
      currentRecipe: {},
      currentRecipeId: 0,
    };
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  getData(searchString) {
    fetch(recipeUrl + searchString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        this.props.updateSearchRecipes(data);
      }
    }).done();
  }

  postMeal(recipeId) {
    fetch(mealUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.getToken(),
      },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        recipeId,
      }),
    });

    this.gotoPrevious();
  }

  gotoNext(recipe) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        hideInfo: this.hideInfo,
        postMeal: this.postMeal,
        text: 'Add',
      },
    });
  }

  gotoPrevious() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoDisplay />
        <Searchbar enter={this.getData} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getSearchRecipes().map((meal, i) => (
            <MealTile
              recipe={meal}
              showInfo={this.gotoNext}
              key={i}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

