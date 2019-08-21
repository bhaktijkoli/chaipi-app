import React, { Component } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text, Badge, View } from 'native-base';
import { If } from 'react-if';
import { Col, Row, Grid } from 'react-native-easy-grid';

import AuthActions from './../actions/authActions'

class FooterEx extends Component {
  componentDidMount() {
  }
  render() {
    let tab = this.props.tab
    let cartCount = this.props.auth.cart.length;
    let order = this.props.auth.order;
    return(
      <View>
        <If condition={order != null}>
          <Footer>
            <View style={customStyle.orderView}>
              <View style={{flex: 1}}>
                <Text numberOfLines={1}>{AuthActions.getStatusTitle(order)}</Text>
                <Text numberOfLines={1} note>{AuthActions.getStatusNote(order)}</Text>
              </View>
              <View style={{flex: 1}}>
                <Button primary full onPress={e=>this.props.navigation.navigate('OrderDetails')}><Text>VIEW</Text></Button>
              </View>
            </View>
          </Footer>
        </If>
        <Footer>
          <FooterTab>
            <Button vertical active={tab=='home'} onPress={e=>this.onClick('Home')}>
              <Icon name="home" type="AntDesign" />
            </Button>
            <Button vertical active={tab=='search'} onPress={e=>this.onClick('Search')}>
              <Icon name="search1" type="AntDesign" />
            </Button>
            <Button badge={cartCount>0} vertical active={tab=='cart'} onPress={e=>this.onClick('Cart')}>
              <If condition={cartCount>0}>
                <Badge primary><Text>{cartCount}</Text></Badge>
              </If>
              <Icon name="shoppingcart" type="AntDesign" />
            </Button>
            <Button vertical active={tab=='account'} onPress={e=>this.onClick('Account')}>
              <Icon name="user" type="AntDesign" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
  onClick(menu) {
    this.props.navigation.navigate(menu);
  }
}

const customStyle = StyleSheet.create({
  orderView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    flex: 1,
  },
  centerButton: { elevation: 4,
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    marginBottom: 20,
  }
})

export default FooterEx;
