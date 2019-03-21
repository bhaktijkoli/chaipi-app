import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Title, Icon } from 'native-base';

import Style from './../styles/style';

class Header2 extends Component {
  render() {
    return(
      <Header transparent>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right/>
      </Header>
    )
  }
}

export default Header2;
