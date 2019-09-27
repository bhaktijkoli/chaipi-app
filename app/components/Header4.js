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
            <Button transparent >
              <Icon name='menu' color='#000000' onPress={() => this.props.navigation.openDrawer()}/>
              {/*<Icon name='arrow-back' onPress={()=> this.props.navigation.goBack()}/>*/}
            </Button>
          </Left>
        </If>
        <Body>
          <Title>{this.props.title}</Title>
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

export default withNavigation(Header2);
