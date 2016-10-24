import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

<<<<<<< 9fbb85454ca7f30528559195ccaa49b636fb6cc4
=======
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 2, 
    borderColor: 'gray'
  },
});

>>>>>>> (feat) add Header for info display, made search bar pretty
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
        <TextInput
          // ref={component => this._textInput = component}
<<<<<<< 9fbb85454ca7f30528559195ccaa49b636fb6cc4
          style={{ height: 40, flexDirection: 'row', textAlign: 'center', borderWidth: 1, borderColor: 'green' }}
=======
          style={{ height: 40, width: width*0.9 }}
          underlineColorAndroid='transparent'
>>>>>>> (feat) add Header for info display, made search bar pretty
          onChangeText={text => this.setState({ text })}
          placeholder="Search..."
          value={this.state.text}
        />
    );
  }
}
