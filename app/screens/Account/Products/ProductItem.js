import React, { Component } from 'react';
import { connect } from "react-redux";
import { Image } from 'react-native';
import { ListItem, Thumbnail, Left, Right, Body, Button, Icon, Text } from 'native-base';

import Style from './../../../styles/style';

class ProductItem extends Component {
  render() {
    let product = this.props.product;
    let image = { uri: product.image };
    return(
        <ListItem thumbnail style={{marginBottom:10}}>
          <Left>
            <Thumbnail square source={image} style={{width:74, height: 74}}/>
          </Left>
          <Body>
            <Text>{product.name}</Text>
            <Text note>&#8377;{product.price}</Text>
          </Body>
        </ListItem>
    )
  }
}


export default ProductItem;
