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

var url = 'https://mealdotnext.herokuapp.com/api/meal/580fb932530bb17c05bc4142';

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      displayInfo: false,
      currentRecipe: {},
      currentMeal: 0
    };
  } 

  componentWillMount () {
    this.getData();
  }

  postMeal() {
    console.log(this.state.currentMeal);
    fetch('https://mealdotnext.herokuapp.com/api/meal/' 
            + this.state.currentMeal, 
            { method: 'DELETE' });
    this.setState({
      displayInfo: false,
      currentRecipe: {}
    }, this.getData);

  }

  getData () {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          fetchData: data
        });
      }).done();
  }

  showInfo(recipe, mealId) {
    console.log('meal id on show info: ', mealId);
    this.setState({
      currentRecipe: recipe,
      displayInfo: true,
      currentMeal: mealId
    })
  }

  hideInfo() {
    this.setState({
      displayInfo: false,
      currentRecipe: {}
    }, this.getData);
    
  }


  render() {
    if(!this.state.fetchData) {
      return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: 'http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif'}}
        />
      </View>
      )
    } 
    else if(this.state.displayInfo) {
      return <InfoDisplay recipe={this.state.currentRecipe} 
                          hideInfo={this.hideInfo.bind(this)}
                          postMeal={this.postMeal.bind(this)}
                          text='DELETE' />
    } 
    else {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={false}
                      alwaysBounceVertical={true}>

            {this.state.fetchData.map((meal, i) => (
              <MealTile recipe={meal.recipe} 
                        showInfo={this.showInfo.bind(this)}
                        key={i}
                        mealId={meal._id}/> 
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
