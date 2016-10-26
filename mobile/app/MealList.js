
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';

const url = 'https://mealdotnext4.herokuapp.com/api/user/';

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: {mealsObjs: []},
      displayInfo: false,
      currentRecipe: {},
      currentMeal: 0,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(url + this.props.userId, {method: 'GET', headers: { 'x-access-token': this.props.token}})
      .then(res => res.json())
      .then((data) => {
        // console.log('mealsObjs: ', data.mealsObjs);
        this.props.update(data.mealsObjs.map(meal => meal.recipe));
        this.setState({
          fetchData: data,
        });
      }).done();
  }

  postMeal() {
    fetch(`https://mealdotnext4.herokuapp.com/api/meal/${this.state.currentMeal}`,
            { method: 'DELETE',
              headers: {'x-access-token': this.props.token} });
    this.setState({
      displayInfo: false,
      currentRecipe: {},
    }, this.getData);
  }

  showInfo(recipe, mealId) {
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

            {this.state.fetchData.mealsObjs.map((meal, i) => (
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
