import React, { Component } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class FooterEx extends Component {
  componentDidMount() {
  }
  render() {
    let tab = this.props.tab
    let cartCount = this.props.auth.cart.length;
    return(
      <Footer>
        <FooterTab>
          <Button vertical active={tab=='home'} onPress={e=>this.onClick('Home')}>
            <Icon name="home" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='search'}>
            <Icon name="search1" type="AntDesign" />
          </Button>
          <Button primmary active={tab=='favorites'} style={customStyle.centerButton} onPress={e=>this.onClick('OrderDetails')}>
            <Icon name="hearto" type="AntDesign" style={{color: '#FFF'}}/>
          </Button>
          <Button badge vertical active={tab=='cart'} onPress={e=>this.onClick('Cart')}>
            <Badge primary><Text>{cartCount}</Text></Badge>
            <Icon name="shoppingcart" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='account'} onPress={e=>this.onClick('Account')}>
            <Icon name="user" type="AntDesign" />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
  onClick(menu) {
    this.props.navigation.navigate(menu);
  }
}

const customStyle = StyleSheet.create({
  centerButton: { elevation: 4,
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    marginBottom: 20
  }
})

export default FooterEx;
