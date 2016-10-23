import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class Tile extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <View>
        <Image
          style={{width: 100, height: 300}}
          source={{uri: 'http://magic.wizards.com/sites/mtg/files/images/featured/EN_Jace_8_Gallery.jpg'}}
        />
      </View>
    );
  }
}