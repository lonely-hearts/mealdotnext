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
    height: 60,
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
            if (index > 0) {
              navigator.pop();
            }
          }}
        >
          <Text style={styles.leftNavButtonText}>Back</Text>
        </TouchableHighlight>
      );
    }
    return null;
  },
  RightButton(route) {
    if (route.onPress) {
      return (
        <TouchableHighlight onPress={() => route.onPress()}>
          <Text style={styles.rightNavButtonText}>
            { route.rightText || 'Right Button' }
          </Text>
        </TouchableHighlight>
      );
    }
    return null;
  },
  Title() {
    return (<Text style={styles.title}>MY APP TITLE</Text>);
  },
};

const renderScene = (route, navigator) => (
  <route.component {...route.passProps} navigator={navigator} />
);

const App = () => (
  <Navigator
    style={{ flex: 1 }}
    initialRoute={{ name: 'Login', component: Login }}
    renderScene={renderScene}
    navigationBar={
      <Navigator.NavigationBar
        style={styles.nav}
        routeMapper={NavigationBarRouteMapper}
      />
    }
  />
);

// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     flex: 1,
//   },
//   selectedTab: {
//     backgroundColor: 'green',
//   },
//   titleText: {},
//   selectedTitleText: {
//     color: 'white',
//   },
// });

Exponent.registerRootComponent(App);

