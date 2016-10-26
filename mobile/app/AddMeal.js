import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import HeaderDisplay from './HeaderDisplay';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';

var width = Dimensions.get('window').width;

var recipeUrl = 'https://mealdotnext4.herokuapp.com/api/recipe/';
var mealUrl = 'https://mealdotnext4.herokuapp.com/api/meal/'

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      displayInfo: false,
      searchString: '',
      currentRecipe: {},
      currentRecipeId: 0
    };
  } 

  getData() {
    fetch(recipeUrl + this.state.searchString, {
      method: 'GET', 
      headers: {'x-access-token': this.props.token}
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({ fetchData: data });
        }
      }).done();
  }

  postMeal() {
    fetch(mealUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.props.token,
      },
      body: JSON.stringify({
        userId: this.props.userId,
        recipeId: this.state.currentRecipeId
      })
    });
    
    this.setState({
      displayInfo: false,
      currentRecipe: {}
    }, this.getData);
  }

  showInfo(recipe) {
    this.setState({
      currentRecipe: recipe,
      displayInfo: true,
      currentRecipeId: recipe._id
    })
  }

  hideInfo() {
    this.setState({
      displayInfo: false,
      currentRecipe: {}
    }, this.getData);
  }

  search(string) {
    this.setState({
      searchString: string
    }, this.getData);
  }

  render() {
    if(this.state.searchString === '') {
      return (
        <View style={styles.container}>
          <LogoDisplay />
          <Searchbar enter={this.search.bind(this)}/>
        </View>
      )
    } 
    else if(this.state.displayInfo) {
      return <InfoDisplay recipe={this.state.currentRecipe} 
                          hideInfo={this.hideInfo.bind(this)} 
                          postMeal={this.postMeal.bind(this)}
                          text='Add'/>
    } 
    else {
      return (
        <View style={styles.container}>
          <LogoDisplay />
          <Searchbar enter={this.search.bind(this)}/>
          <ScrollView contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={false}
                      alwaysBounceVertical={true}>
            {this.state.fetchData.map((meal, i) => (
              <MealTile recipe={meal} 
                        showInfo={this.showInfo.bind(this)}
                        key={i}/> 
            ))}
          </ScrollView>
        </View>
      )
    }
  }
}

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
