import React, { Component } from 'react';
import { AppRegistry, View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import sampleData from '../assets/sampleData';

var width = Dimensions.get('window').width;

const LogoDisplay = () => (
  <View style={styles.logo}>
    <Text style={styles.headline}>
      Meal.Next
    </Text>
  </View>
)

export default LogoDisplay;

const styles = StyleSheet.create({
  logo: {
    width: width, 
    height: 44,
    backgroundColor: 'green',
    borderBottomWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});