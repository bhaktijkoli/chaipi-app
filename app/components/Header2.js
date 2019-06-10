import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { If } from 'react-if';
import { Header, Left, Body, Right, Button, Title, Icon } from 'native-base';

import Style from './../styles/style';

class Header2 extends Component {
  render() {
    return(
      <Header transparent>
        <If condition={!this.props.navigation.isFirstRouteInParent()}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
        </If>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right/>
      </Header>
    )
  }
}

export default withNavigation(Header2);
