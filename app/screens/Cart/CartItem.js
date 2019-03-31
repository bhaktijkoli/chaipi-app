import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

class CartItem extends Component {
  render() {
    let order = this.props.order;
    let product = order.product;
    return(
      <ListItem thumbnail style={{marginBottom:10}}>
        <Left>
          <Thumbnail square source={{ uri: product.image }} style={{width:72, height:72}}/>
        </Left>
        <Body>
          <Text numberOfLines={1}>{product.name}</Text>
          <Text numberOfLines={1} note>{product.description}</Text>
        </Body>
      </ListItem>
    )
  }
}

export default CartItem;
