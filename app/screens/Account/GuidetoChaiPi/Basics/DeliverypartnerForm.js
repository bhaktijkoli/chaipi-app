import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from '../../../../styles/style';

import deliverypartner from '../../../../data/databasic/deliverypartner';

 
class DeliverypartnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deliverypartner: require('../../../../data/databasic/deliverypartner.json'),
    }
  }
    render() {
        return (
          <View>
          {this.partner()}
        </View>
    )
        }

     partner(){
      return deliverypartner.map(function(options, i){
        return(
          <View key = {i}>
            <Text style = {Style.heading}>{options.title}</Text>
            <Text>{options.description}</Text>
          </View>
        );
      });
    }
}

export default DeliverypartnerForm;