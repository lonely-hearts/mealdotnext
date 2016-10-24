import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import LogoDisplay from './app/LogoDisplay';
import MealList from './app/MealList';
import HeadBuffer from './app/HeadBuffer';
import Searchbar from './app/Searchbar';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <HeadBuffer />
        <LogoDisplay />
        <Searchbar />
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarBackgroundColor="green"
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="white"
          tabBarUnderlineStyle={{ backgroundColor: "white" }}
          tabBarPosition="overlayBottom"
        >
          <MealList tabLabel="Add" />
          <View tabLabel="Shopping List">
          </View>
          <View tabLabel="Meals">
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

Exponent.registerRootComponent(App);

