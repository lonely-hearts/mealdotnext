import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

var width = Dimensions.get('window').width;

const HeadBuffer = () => (
  <View style={styles.buffer} />
)

export default HeadBuffer;

const styles = StyleSheet.create({
  buffer: {
    width: width, 
    height: 22,
    backgroundColor: '#006400'
  }
});