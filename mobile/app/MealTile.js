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
      <View>
        <Image
          style={styles.picture}
          source={{uri: this.props.recipe.image}}>
          <View style={styles.textwrap}>
            <Text style={styles.headline}>
              {this.props.recipe.label}
            </Text>
            <Text style={styles.headline2}>
              {this.props.recipe.label}
            </Text>
          </View>
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
  headline2: {
    position: 'absolute',
    fontSize: 30,
    marginLeft: 40,
    top: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    opacity: 1
  },
  headline: {
    position: 'absolute',
    marginLeft: 43,
    fontSize: 30,
    top: 27,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black',
    opacity: 1
  }
});