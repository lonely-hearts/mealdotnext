import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

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
          style={{ height: 40, flexDirection: 'row', textAlign: 'center', borderWidth: 1, borderColor: 'green' }}
          onChangeText={text => this.setState({ text })}
          placeholder="Search..."
          value={this.state.text}
        />
    );
  }
}
