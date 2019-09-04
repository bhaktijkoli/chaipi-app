import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';
import { createDrawerNavigator } from "react-navigation";


import Style from './../styles/style';

class Header3 extends Component {
  render() {
    let location = "NOW";
    if(this.props.auth.current_address) {
      location = this.props.auth.current_address.type;
    }
    location = location.charAt(0).toUpperCase() + location.slice(1);
    return(
      <Header transparent>
        <Left>
          <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
        </Left>
        <Body>
          <Title onPress={e=>this.props.navigation.navigate('SearchLocation')}>{location}</Title>
        </Body>
        <Right>
          {this.renderRight()}
        </Right>
      </Header>
    )
  }

  renderRight = () => {
    if(this.props.right) {
      return this.props.right();
    }
  }
}

export default withNavigation(Header3);
