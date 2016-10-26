
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';

const url = 'https://mealdotnext.herokuapp.com/api/meal/580fb932530bb17c05bc4142';

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      displayInfo: false,
      currentRecipe: {},
      currentMeal: 0,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          fetchData: data,
        });
      }).done();
  }

  postMeal() {
    fetch(`https://mealdotnext.herokuapp.com/api/meal/${this.state.currentMeal}`,
            { method: 'DELETE' });
    this.setState({
      displayInfo: false,
      currentRecipe: {},
    }, this.getData);
  }

  showInfo(recipe, mealId) {
    console.log('meal id on show info: ', mealId);
    this.setState({
      currentRecipe: recipe,
      displayInfo: true,
      currentMeal: mealId,
    })
  }

  hideInfo() {
    this.setState({
      displayInfo: false,
      currentRecipe: {},
    }, this.getData);
  }

  render() {
    if (this.state.displayInfo) {
      return <InfoDisplay recipe={this.state.currentRecipe}
                          hideInfo={this.hideInfo.bind(this)}
                          postMeal={this.postMeal.bind(this)}
                          text='DELETE' />
    } 
    else {
      return (
        <View style={styles.container}>
          <LogoDisplay />
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
      );
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
