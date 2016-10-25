import Exponent from 'exponent';
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import sampleData from '../assets/sampleData';
import MealTile from './MealTile';

import Searchbar from './Searchbar';
import HeaderDisplay from './HeaderDisplay';
import HeadBuffer from './HeadBuffer';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';

var width = Dimensions.get('window').width;

var url = 'https://calm-eyrie-10224.herokuapp.com/api/recipe/';
// var qs = (appId, appKey, search) => {
//   var params = {
//       'app_id': appId,
//       'app_key': appKey,
//       'q': search 
//   };

//   var esc = encodeURIComponent;
//   var query = Object.keys(params)
//     .map(k => esc(k) + '=' + esc(params[k]))
//     .join('&');

//   return query;
// }

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: [],
      displayInfo: false,
      searchString: 'chicken',
      currentRecipe: {}
    };
  } 

  componentWillMount () {
    this.getData();
  }

  getData () {
    fetch(url + this.state.searchString)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('DATA', data[0]);
        this.setState({
          fetchData: data
        });
      }).done();
  }

  showInfo(recipe) {
    this.setState({
      currentRecipe: recipe,
      displayInfo: true
    })
  }

  hideInfo() {
    this.setState({
      displayInfo: false,
      currentRecipe: {}
    })
  }

  search(string) {
    this.setState({
      searchString: string
    }, this.getData);
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
    } 
    else if(this.state.displayInfo) {
      return <InfoDisplay recipe={this.state.currentRecipe} 
                          hideInfo={this.hideInfo.bind(this)} />
    } 
    else {
      return (
        <View style={styles.container}>
          <Searchbar enter={this.search.bind(this)}/>
          <ScrollView contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={false}
                      alwaysBounceVertical={true}>
            {this.state.fetchData.map((meal, i) => (
              <MealTile recipe={meal} 
                        showInfo={this.showInfo.bind(this)}
                        key={i}/> 
            ))}
          </ScrollView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
});
