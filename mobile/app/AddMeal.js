import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import sampleData from '../assets/sampleData';
import MealTile from './MealTile';

import Searchbar from './Searchbar';
import HeaderDisplay from './HeaderDisplay';
import HeadBuffer from './HeadBuffer';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';

var width = Dimensions.get('window').width;

var url = 'https://mealdotnext.herokuapp.com/api/recipe/';

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
    fetch(url + this.state.searchString)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          fetchData: data
        });
      }).done();
  }

  postMeal() {
    fetch('https://mealdotnext.herokuapp.com/api/meal/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '580fb932530bb17c05bc4142',
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
            <Searchbar enter={this.search.bind(this)}/>
          </View>
        )
    } 
    else if(this.state.displayInfo) {
      return <InfoDisplay recipe={this.state.currentRecipe} 
                          hideInfo={this.hideInfo.bind(this)} 
                          postMeal={this.postMeal.bind(this)}
                          text='ADD'/>
    } 
    else {
      return (
        <View style={styles.container}>
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
