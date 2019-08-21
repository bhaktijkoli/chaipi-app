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

 
class LegalForm extends Component {
    render() {
        return (
            <Container>
        <Content>
           <List>
               <ListItem>
               </ListItem>
               {this.renderLegalItems(legalitems)}
           </List>
        </Content>
      </Container>
        )
     }

     renderLegalItems(arrayItems, condition=true) {
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

const legalitems= [
    {name : 'Copyright', route: 'Copyright' , type: 'AntDesign'},
    {name : 'Terms & Conditions', route: 'TermsConditions', type: 'AntDesign'},
    {name : 'Privacy Policy', route: 'PrivacyPolicy', type: 'AntDesign'},
    {name : 'Software Licenses', route: 'SoftwareLicenses', type: 'AntDesign'},
    {name : 'Pricing', route: 'Pricing', type: 'AntDesign'},
];


export default LegalForm;