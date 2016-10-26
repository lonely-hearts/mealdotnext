import Exponent from 'exponent';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import Searchbar from './app/Searchbar';
import HeadBuffer from './app/HeadBuffer';
import LogoDisplay from './app/LogoDisplay';
import Home from './app/Home';
import NavBar from './app/NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'MealList',
      loggedIn: true
    };
  }

  changePage(page) {
    this.setState({ page: page });  
  }

  render() {
    return (
      <View style={styles.main}>
        <HeadBuffer />
        <Home page={this.state.page}/>
        <NavBar changePage={this.changePage.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  selectedTab: {
    backgroundColor: 'green',
  },
  titleText: {},
  selectedTitleText: {
    color: 'white',
  }
});

const Router = createRouter(() => ({
  tabBar: () => TabBar,
  addMeal: () => AddMeal,
  shoppingList: () => ShoppingList,
  meals: () => MealList,
}));


class TabBar extends React.Component {
  static route = {
    navigationBar: {
      title: null,
      renderBackground: () => { 
        return(
          <View style={styles.main}>
            <HeadBuffer/>
            <LogoDisplay />
          </View>
        )
      }
    }
  }

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="meals">

        <TabItem
          id="meals"
          title="My Meals"
          renderTitle={isSelected => this._renderTitle('My Meals', isSelected)}
          selectedStyle={styles.selectedTab}
          >
          <StackNavigation
            id="meals"
            initialRoute={Router.getRoute('meals')}
          />
        </TabItem>

        <TabItem
          id="shoppingList"
          title="Shopping List"
          renderTitle={isSelected => this._renderTitle('Shopping List', isSelected)}
          selectedStyle={styles.selectedTab}
          >
          <StackNavigation
            id="shoppingList"
            initialRoute={Router.getRoute('shoppingList')}
          />
        </TabItem>

        <TabItem
          id="addMeal"
          title="Add Meal"
          renderTitle={isSelected => this._renderTitle('Add Meal', isSelected)}
          selectedStyle={styles.selectedTab}
          >
          <StackNavigation
            id="addMeal"
            navigatorUID="addMeal"
            initialRoute={Router.getRoute('addMeal')}
          />
        </TabItem>
      </TabNavigation>
    )
  }

  _renderTitle(text: string, isSelected: boolean) {
    return (
      <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
        {text}
      </Text>
    );
  };
}


Exponent.registerRootComponent(App);

