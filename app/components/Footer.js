import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

class FooterEx extends Component {
  componentDidMount() {
  }
  render() {
    let tab = this.props.tab;
    return(
      <Footer>
        <FooterTab>
          <Button vertical active={tab=='home'} onPress={e=>this.onClick('Home')}>
            <Icon name="home" type="AntDesign" />
          </Button>
          <Button vertical active={tab=='search'}>
            <Icon name="search1" type="AntDesign" />
          </Button>
          <Button primmary active={tab=='favorites'} style={customStyle.centerButton}>
            <Icon name="hearto" type="AntDesign" style={{color: '#FFF'}}/>
          </Button>
          <Button vertical active={tab=='favorites'}>
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
