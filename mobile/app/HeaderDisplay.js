import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

var width = Dimensions.get('window').width;

var HeaderDisplay = ({recipe}) => (
  <View style={styles.logo}>
    <Text style={styles.headline}>
      {recipe.label}
    </Text>
  </View>
)

export default HeaderDisplay;

const styles = StyleSheet.create({
  logo: {
    width: width, 
    height: 44,
    backgroundColor: 'green',
    borderBottomWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
  },
  headline: {
    fontSize: 30,
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});