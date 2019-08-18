import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Row } from "react-native-easy-grid";

import Style from './../styles/style';
import Request from './../utils/request';

import SpinnerModel from './SpinnerModel';

class CartButton extends Component {
  state = {
    count: 0,
    process: false,
  }
  componentDidMount() {
    this.setState({count: this.props.cart.count})
  }
  render() {
    let count = this.state.count;
    return(
      <Row>
        <SpinnerModel visible={this.state.process}/>
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
    this.setState({process: true});
    if(count < 0) count = 0;
    let data = {
      cart: this.props.cart.id,
      count: count,
    }
    this.setState({count})
    Request.post('/cart/count', data)
    .then(res => {
      this.setState({process: false});
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
    fontSize: 12,
    textAlign: 'center',
    justifyContent : "space-between",
    borderColor: '#f39c12',
    borderWidth: 0.6,
  },
  buttonLeft: {
    borderTopRightRadius:0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  buttonRight: {
    borderTopLeftRadius:0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  }
})

export default CartButton;
