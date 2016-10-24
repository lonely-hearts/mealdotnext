import React, { Component } from 'react';
import { AppRegistry, View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import sampleData from '../assets/sampleData';

var width = Dimensions.get('window').width;

export default class Tile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.tile}>
        <Image
          style={styles.picture}
          source={{uri: this.props.recipe.image}}>
          <View style={styles.textwrap}>
            <Text style={styles.headline}>
              {this.props.recipe.label}
            </Text>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    width: width*0.9, 
    height: 90, 
    borderRadius: 5,
    marginTop: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3
    },
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'black',
  },
  picture: {
    width: width*0.9, 
    height: 90, 
    opacity: .85, 
    borderRadius: 5,   
  },
  textwrap: {
    width: width*0.9, 
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  headline: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  }
});