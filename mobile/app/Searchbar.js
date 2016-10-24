import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
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
          // ref={component => this._textInput = component}
          style={{ height: 50, width: 300, borderWidth: 1, borderColor: '#888888' }}
          onChangeText={text => this.setState({ text })}
          placeholder="Search..."
          value={this.state.text}
        />
      </View>
    );
  }
}
