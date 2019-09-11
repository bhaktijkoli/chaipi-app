import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from '../../../../styles/style';

import HowtoplaceanorderonChaiPi from '../../../../data/databasic/HowtoplaceanorderonChaiPi';

 
class HowplaceorderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        HowtoplaceanorderonChaiPi: require('../../../../data/databasic/HowtoplaceanorderonChaiPi'),
    }
  }
    render() {
        return (
          <View>
          {this.order()}
        </View>
    )
        }

     order(){
      return HowtoplaceanorderonChaiPi.map(function(options, i){
        return(
          <View key = {i}>
            <Text style = {Style.heading}>{options.title}</Text>
            <Text>{options.description}</Text>
          </View>
        );
      });
    }
}

export default HowplaceorderForm;