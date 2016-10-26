import Exponent from 'exponent';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';

import Searchbar from './app/Searchbar';
import HeadBuffer from './app/HeadBuffer';
import LogoDisplay from './app/LogoDisplay';
import Home from './app/Home';
import NavBar from './app/NavBar';
import Login from './app/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'MealList',
      userId: null,
      token: null,
    };
  }

  componentWillMount() {
    AsyncStorage.setItem('userId', '');
  }

  changePage(page) {
    this.setState({ page: page });  
  }

  login() {
    AsyncStorage.getItem('userId', (err, result) => {
      this.setState( {
        userId: result
      });
    });
    AsyncStorage.getItem('token', (err, result) => {
      this.setState( {
        token: result
      });
    });
  }

  render() {
    if (this.state.userId && this.state.token) {
      return (
        <View style={styles.main}>
          <HeadBuffer />
          <Home 
            page={this.state.page} 
            userId={this.state.userId}
            token={this.state.token}/>
          <NavBar changePage={this.changePage.bind(this)}/>
        </View>
      );
    }
    else {
      return (<Login success={this.login.bind(this)}/>)
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
});


Exponent.registerRootComponent(App);

