import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 2, 
    borderColor: 'gray',
    width: width*0.9 
  },
});

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  clearSeach() {
    this.setState({ text: '' });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: width*0.9 }}
          underlineColorAndroid='transparent'
          onChangeText={text => this.setState({ text })}
          placeholder="Search..."
          value={this.state.text}
        />
      </View>
    );
  }
}
