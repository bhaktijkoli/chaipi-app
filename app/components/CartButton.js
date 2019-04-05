import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import { Row } from "react-native-easy-grid";

import Style from './../styles/style';

class CartButton extends Component {
  render() {
    return(
      <Row>
        <Button bordered small style={{borderTopRightRadius:0, borderBottomRightRadius: 0}}>
          <Text style={{paddingLeft: 10, paddingRight: 10}}>-</Text>
        </Button>
        <Button bordered small style={{borderRadius: 0}}>
          <Text>{this.props.cart.count}</Text>
        </Button>
        <Button bordered small style={{borderTopLeftRadius:0, borderBottomLeftRadius: 0}}>
          <Text style={{paddingLeft: 10, paddingRight: 10}}>+</Text>
        </Button>
      </Row>
    )
  }
}

export default CartButton;
