import React, { Component } from 'react';
import { AppRegistry, View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import sampleData from '../assets/sampleData';

var width = Dimensions.get('window').width;

export default class LogoDisplay extends Component {
	render() {
    return (
      <View style={styles.logo}>
        <Text style={styles.headline}>
          Meal.Next
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: width, 
    height: 44,
    backgroundColor: 'green',
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  headline: {
    fontSize: 30,
    marginLeft: width*0.08,
    marginTop: 3,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});