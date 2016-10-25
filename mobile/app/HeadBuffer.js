import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

var width = Dimensions.get('window').width;

export default class HeadBuffer extends Component {
	render() {
    return (
      <View style={styles.buffer} />
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