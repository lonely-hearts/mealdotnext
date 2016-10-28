import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import AddMeal from './app/AddMeal';
import MealList from './app/MealList';
import Searchbar from './app/Searchbar';
import HeadBuffer from './app/HeadBuffer';
import LogoDisplay from './app/LogoDisplay';
import Home from './app/Home';
import NavBar from './app/NavBar';
import Login from './app/Login';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
    flexDirection: 'column',
    marginTop: 100,
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 2,
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight: 13,
    marginTop: 2,
  },
  nav: {
    top: null,
    height: 60,
    bottom: 0,
    backgroundColor: '#efefef',
  },
  title: {
    marginTop: 4,
    fontSize: 16,
  },
  button: {
    height: 60,
    marginBottom: 10,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            navigator.push({
              component: MealList,
              passProps: {
              },
            });
          }}
        >
          <Text style={styles.leftNavButtonText}>MealList</Text>
        </TouchableHighlight>
      );
    }
    return null;
  },
  RightButton(route, navigator, index) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            navigator.push({
              component: AddMeal,
              passProps: {
              },
            });
          }}
        >
          <Text style={styles.leftNavButtonText}>Add Meal</Text>
        </TouchableHighlight>
      );
    }
    // if (route.onPress) {
    //   return (
    //     <TouchableHighlight onPress={() => route.onPress()}>
    //       <Text style={styles.rightNavButtonText}>
    //         { route.rightText || 'Right Button' }
    //       </Text>
    //     </TouchableHighlight>
    //   );
    // }
    return null;
  },
  Title() {
    return (<Text style={styles.title}>MY APP TITLE</Text>);
  },
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      token: null,
      mealList: [],
      searchRecipes: [],
    };
    this.getMealList = this.getMealList.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getSearchRecipes = this.getSearchRecipes.bind(this);
    this.updateMealList = this.updateMealList.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateSearchRecipes = this.updateSearchRecipes.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  getMealList() { return this.state.mealList; }
  getToken() { return this.state.token; }
  getUserId() { return this.state.userId; }
  getSearchRecipes() { return this.state.searchRecipes; }

  updateMealList(mealList) { this.setState({ mealList }); }
  updateToken(token) { this.setState({ token }); }
  updateUserId(userId) { this.setState({ userId }); }
  updateSearchRecipes(searchRecipes) { this.setState({ searchRecipes }); }

  renderScene(route, navigator) {
    return (
      <route.component
        {...route.passProps}
        navigator={navigator}
        getMealList={this.getMealList}
        getToken={this.getToken}
        getUserId={this.getUserId}
        getSearchRecipes={this.getSearchRecipes}
        updateMealList={this.updateMealList}
        updateToken={this.updateToken}
        updateUserId={this.updateUserId}
        updateSearchRecipes={this.updateSearchRecipes}
      />
    );
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Login', component: Login }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.nav}
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }
}

Exponent.registerRootComponent(App);

