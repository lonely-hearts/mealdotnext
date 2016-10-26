import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import t from 'tcomb-form-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
// ENV Variables
const loginUrl = 'https://mealdotnext4.herokuapp.com/api/user/authenticate';
const signupUrl = 'https://mealdotnext4.herokuapp.com/api/user';
const Form = t.form.Form;
const Person = t.struct({
  username: t.String,
  password: t.String,
});
const options = {};


export default class Login extends React.Component {
  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  }
  authUser(url) {
    const value = this.refs.form.getValue();
    if (value) {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        }),
      })
      .then(response => response.json())
      .then((responseData) => {
        this._onValueChange('token', responseData.token);
        this._onValueChange('userId', responseData.userId);
        this.props.success();
      })
      .catch(error => {
        Alert.alert('DO YOU EVEN LYFT BRUH?')
      })
      .done();
    }
  }
  render() {
    return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Meal.next</Text>
      </View>
      <View style={styles.row}>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
      </View>
      <View style={styles.row}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.authUser(loginUrl)}
          underlayColor="limegreen"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.authUser(signupUrl)}
          underlayColor="limegreen"
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
}
