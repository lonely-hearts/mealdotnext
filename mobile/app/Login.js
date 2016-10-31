import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
} from 'react-native';
import t from 'tcomb-form-native';
import MealList from './MealList';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'black',
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: width * 0.9,
    borderRadius: 5,
    flexDirection: 'column',
    // width: 150,
    // height: 300,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,.75)',
  },
  title: {
    fontSize: 50,
    fontFamily: 'Futura',
    marginTop: 30,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
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
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
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
const options = {
  fields: {
    username: {
      autoCapitalize: 'none'
    },
    password: {
      secureTextEntry: true
    }
  }
};


const onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = null;
  }

  gotoNext() {
    this.props.navigator.push({
      component: MealList,
      passProps: {
      },
    });
  }

  // login() {
  //   AsyncStorage.getItem('userId', (err, result) => {
  //     this.setState( { userId: result });
  //   });
  //   AsyncStorage.getItem('token', (err, result) => {
  //     this.setState( { token: result });
  //   });
  // }

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
        const token = responseData.token;
        const userId = responseData.userId;
        onValueChange('token', token);
        onValueChange('userId', userId);
        this.props.updateToken(token);
        this.props.updateUserId(userId);
        this.gotoNext();
      })
      .catch(() => {
        Alert.alert('DO YOU EVEN LYFT BRUH?');
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <Image
          // if background image doesn't appear test url, site may have dropped uploaded image
          source={{ uri: 'https://s21.postimg.org/azydn73pz/resized_background.jpg' }}
          style={styles.backgroundImage}
        >
          <View style={styles.row}>
            <Text style={styles.title}>Meal.next</Text>
          </View>
          <View style={styles.container}>
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
        </Image>
      </View>
    );
  }
}
