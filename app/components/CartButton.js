import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Row } from "react-native-easy-grid";

import Style from './../styles/style';
import Request from './../utils/request';

class CartButton extends Component {
  state = {
    count: 0,
  }
  componentDidMount() {
    this.setState({count: this.props.cart.count})
  }
  render() {
    let count = this.state.count;
    return(
      <Row>
        <Button bordered small style={customStyle.buttonLeft} onPress={e=> this.UpdateCount(count-1)}>
          <Text style={{paddingLeft: 10, paddingRight: 10}}>-</Text>
        </Button>
        <Text style={customStyle.text}>{count}</Text>
        <Button bordered small style={customStyle.buttonRight} onPress={e=> this.UpdateCount(count+1)}>
          <Text style={{paddingLeft: 10, paddingRight: 10}}>+</Text>
        </Button>
      </Row>
    )
  }
  UpdateCount(count) {
    if(count < 0) count = 0;
    let data = {
      order: this.props.cart.id,
      count: count,
    }
    this.setState({count})
    Request.post('/order/count', data)
    .then(res => {
      this.props.update();
    })
  }
}

const customStyle = StyleSheet.create({
  text: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:8,
    paddingBottom: 6,
    borderWidth: 0.6,
    fontSize: 12,
    textAlign: 'center',
    justifyContent : "space-between",
    borderColor: '#f39c12'
  },
  buttonLeft: {
    borderTopRightRadius:0,
    borderBottomRightRadius: 0
  },
  buttonRight: {
    borderTopLeftRadius:0,
    borderBottomLeftRadius: 0
  }
})

export default CartButton;
