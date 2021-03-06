import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Header2 from '../../../components/Header2';
import Style from '../../../styles/style';
import pricing from '.././../../data/dataprimary/pricing.json';
 
class PricingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pricing: require('.././../../data/dataprimary/pricing.json'),
    }
  }
    render() {
          return (
            <View>
              {this.price()}
            </View>
        )
     }
     price(){
      return pricing.map(function(options, i){
        return(
          <View key = {i}>
            <Text style = {Style.heading}>{options.title}</Text>
            <Text>{options.description}</Text>
          </View>
        );
      });
    }
}

export default PricingForm;