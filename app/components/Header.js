import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';

import Style from './../styles/style';

class HeaderEx extends Component {
  render() {
    return(
      <Header transparent>
        <Left>
          <Title>{this.props.title}</Title>
        </Left>
      </Header>
    )
  }
}

export default withNavigation(HeaderEx);