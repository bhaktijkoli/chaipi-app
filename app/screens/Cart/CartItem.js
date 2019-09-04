import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import Shimmer from 'react-native-shimmer-placeholder';

import Style from './../../styles/style';
import Request from './../../utils/request';

import CartButton from './../../components/CartButton';

class CartItem extends Component {
  state = {
    loaded: false,
  }
  render() {
    let cart = this.props.cart;
    let product = cart.product
    console.log("URL", product.image);
    return(
      <View style={{flexDirection: 'row'}}>
        <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
          <Image source={{ uri: Request.url(product.image) }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
        </Shimmer>
        <Grid style={CustomStyle.descContainer}>
          <Row>
            <Text numberOfLines={1} style={CustomStyle.title}>{product.name}</Text>
          </Row>
          <Row>
            <Col>
              <CartButton cart={cart} update={this.updateCart.bind(this)}/>
            </Col>
            <Col>
              <Text style={[{fontSize:14, alignSelf: 'flex-end'}, Style.lightColor]}>&#8377;{product.price*cart.count}</Text>
            </Col>
          </Row>
        </Grid>
        <View style={{flexDirection: 'column'}}>
        </View>
      </View>
    )
  }
  updateCart() {
    this.props.update()
  }
}

const CustomStyle = StyleSheet.create({
  image: {
    width:116,
    height:84,
    marginLeft:5,
    marginRight:5,
    marginBottom:10,
  },
  title: {
    marginTop:5,
    marginRight:5,
    marginBottom:2,
    marginLeft:5,
    width:'100%',
    height:20,
  },
  note: {
    marginRight:5,
    marginBottom:5,
    marginLeft:5,
    width:'100%',
    height: 17,
  },
  descContainer: {
    marginRight: 10,
  }
})

export default CartItem;
