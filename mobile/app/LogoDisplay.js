import React, { Component } from 'react';
import { AppRegistry, View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import sampleData from '../assets/sampleData';

var width = Dimensions.get('window').width;

export default class LogoDisplay extends Component {
	render() {
    return (
      <View>
        <Image
          style={styles.picture}
          source={{uri: sampleData.hits[0].recipe.image}}
        >
          <Text style={styles.headline}>
            {sampleData.hits[0].recipe.label}
          </Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    width: width*0.9, 
    height: 90, 
    opacity: 0.6, 
    borderRadius: 5, 
    marginTop: 10
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    top: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});