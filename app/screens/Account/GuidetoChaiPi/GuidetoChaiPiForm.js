import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Header2 from './../../../components/Header2';
import { StyleSheet } from 'react-native';
import Style from './../../../styles/style';
import Request from './../../../utils/request';
import { ScrollView } from 'react-native-gesture-handler';
import style from './../../../styles/style';

 
class GuidetoChaiPiForm extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{fontSize: 20}}>Guide to ChaiPi</Text>
                    <List>
                        <ListItem>
                        </ListItem>
                        {this.renderGuideItems(guideitems)}
                    </List>
                </Content>
            </Container>
        )
     }

     renderGuideItems(arrayItems, condition=true) {
        if(condition) {
          return arrayItems.map((el, key) => {
            return(
              <ListItem key={key} onPress={e=>this.onClickListItem(el.route)}>
                <Body style={{flex:6}}>
                  <Text>{el.name}</Text>
                </Body>
              </ListItem>
            )
          })
        }
        else {
          return null;
        }
      }
      onClickListItem(route) {
        this.props.navigation.navigate(route);
      }
}

const guideitems= [
    {name : 'Basics', route: 'Home' , type: 'AntDesign'},
    {name : 'Policies', route: 'AccountPaymentOptions', type: 'AntDesign'},
];


export default GuidetoChaiPiForm;