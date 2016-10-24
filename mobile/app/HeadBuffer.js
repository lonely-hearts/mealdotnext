import React, { Component } from 'react';
import { AppRegistry, View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import sampleData from '../assets/sampleData';

var width = Dimensions.get('window').width;

export default class HeadBuffer extends Component {
	render() {
    return (
      <View style={styles.buffer}>
        <Text style={styles.headline}>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buffer: {
    width: width, 
    height: 22,
    backgroundColor: '#006400'
  }
});