import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from '../../../../styles/style';

import deliverytimecalculation from '../../../../data/databasic/deliverytimecalculation';

 
class DeliverytimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deliverytimecalculation: require('../../../../data/databasic/deliverytimecalculation.json'),
    }
  }
    render() {
        return (
          <View>
          {this.time()}
        </View>
    )
        }

     time(){
      return deliverytimecalculation.map(function(options, i){
        return(
          <View key = {i}>
            <Text style = {Style.heading}>{options.title}</Text>
            <Text>{options.description}</Text>
          </View>
        );
      });
    }
}

export default DeliverytimeForm;