import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from '../../../../styles/style';

import multipleorder from '../../../../data/datapolicies/multipleorder';

 
class MultipleorderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        multipleorder: require('../../../../data/datapolicies/multipleorder.json'),
    }
  }
    render() {
        return (
          <View>
          {this.Multipleorder()}
        </View>
    )
        }

     Multipleorder(){
      return multipleorder.map(function(options, i){
        return(
          <View key = {i}>
            <Text style = {Style.heading}>{options.title}</Text>
            <Text>{options.description}</Text>
          </View>
        );
      });
    }
}

export default MultipleorderForm;