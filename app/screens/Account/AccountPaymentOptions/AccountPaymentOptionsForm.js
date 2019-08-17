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

 
class AccountPaymentOptionsForm extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style = {{fontSize: 20,}}>Account and Payment Options</Text>
                    <List>
                        <ListItem>
                        </ListItem>
                        {this.renderAccountPaymentItems(accountpaymentitems)}
                    </List>
                </Content>
            </Container>
        )
     }

     renderAccountPaymentItems(arrayItems, condition=true) {
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

const accountpaymentitems= [
    {name : 'Account Setting', route: 'Home' , type: 'AntDesign'},
    {name : 'Payment', route: 'Home', type: 'AntDesign'},
    {name : 'Promotions and Referrals', route: 'Home', type: 'AntDesign'},
];


export default AccountPaymentOptionsForm;