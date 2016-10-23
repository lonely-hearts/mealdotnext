import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class LogoDisplay extends Component {
	render() {
    return (
      <View>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: 'http://magic.wizards.com/sites/mtg/files/images/featured/EN_Jace_8_Gallery.jpg'}}
        />
      </View>
    );
  }
}