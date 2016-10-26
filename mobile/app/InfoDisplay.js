import React, { Component } from 'react';
import { ScrollView, View, Image, Dimensions, Text, StyleSheet, TouchableHighlight } from 'react-native';
import HeaderDisplay from './HeaderDisplay';
import Ingredient from './Ingredient.js';
import Button from './Button';
import Column from './Column';

const width = Dimensions.get('window').width;

var compileNutrition = function(data) {
  var result = [];
  data.forEach(item => {
    result.push(item);
    if(item.sub) {
      item.sub.forEach(subItem => {
        subItem['label'] = ' ' + subItem['label']
        result.push(subItem);
      })
    }
  })
  result.forEach(item => {
    var totalUnit = Number(Number(item['total']).toFixed(2)).toString() + item['unit'];
    item['totalUnit'] = totalUnit;
    var dailyPercent = Number(Number(item['daily']).toFixed(1)).toString() + '%';
    item['dailyPercent'] = dailyPercent;

  })
  return result;
}

export default class InfoDisplay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderDisplay recipe={this.props.recipe} />
        <ScrollView contentContainerStyle={styles.scroller}>
          
          <Image 
            style={styles.picture}
            source={{uri: this.props.recipe.image}} 
          />
          
          <View style={styles.buttonContainer}> 
            <Button onclick={this.props.postMeal} 
                    text={this.props.text} />
            
            <Button onclick={this.props.hideInfo}
                    text='Back'/>
          </View>

          <View style={styles.table}>
            <Column 
                data={this.props.recipe.ingredients} 
                name='Ingredient'
                index='food' 
              />
              <Column 
                data={this.props.recipe.ingredients} 
                name='Qty'
                index='quantity' 
                alignRight={true}
              />
              <Column 
                data={this.props.recipe.ingredients} 
                name='Unit'
                index='measure' 
                alignRight={true}
              />
          </View> 

          <View style={styles.table}>
            <Column 
              data={compileNutrition(this.props.recipe.digest)} 
              name='Nutrient'
              index='label' 
            />
            <Column 
              data={compileNutrition(this.props.recipe.digest)} 
              name='Qty'
              index='totalUnit' 
              alignRight={true}
            />
            <Column 
              data={compileNutrition(this.props.recipe.digest)} 
              name='Daily'
              index='dailyPercent' 
              alignRight={true}
            />
          </View> 

        </ScrollView>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  picture: {
    width: width*0.9, 
    height: 250, 
    opacity: 1,
    borderRadius: 5, 
    marginTop: 10, 
  },
  click: {
    fontSize: 30
  },
  table: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  scroller: {
    marginBottom: 50,
  },
});