import React, { Component } from 'react';
import { connect } from "react-redux";
import { Image } from 'react-native';
import { Card, CardItem, Left, Right, Body, Title, Text } from 'native-base';

import Style from './../../../styles/style';

class ProductItem extends Component {
  render() {
    let product = this.props.product;
    let image = { uri: product.image };
    return(
      <Card>
        <CardItem>
          <Left>
            <Image source={image} style={{width:74, height: 74}}/>
          </Left>
          <Body style={{alignItems: 'flex-start'}}>
            <Title>{product.name}</Title>
            <Text>{product.description}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}


export default ProductItem;
