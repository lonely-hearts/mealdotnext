import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import sampleData from '../assets/sampleData';
import MealTile from './MealTile';

var url = 'https://api.edamam.com/search?';
var qs = (appId, appKey, search) => {
  var params = {
      'app_id': appId,
      'app_key': appKey,
      'q': search 
  };

  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  return query;
}

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fetchData: true};
  } 
  componentWillMount () {
    // fetch(url + qs('beef'))
    //   .then((data) => {
    //     // console.log('DATA, ', JSON.parse(data))
    //     this.setState({
    //       fetchData: JSON.stringify(data)
    //     })
    //   })
  }
  render() {
    if(!this.state.fetchData) {
      return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: 'http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif'}}
        />
      </View>
      )
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={true}>
          {sampleData.hits.map(meal => (
            <MealTile recipe={meal.recipe} /> 
          ))}
        </ScrollView>
      )
    }
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
