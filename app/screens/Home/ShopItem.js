import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { Rating } from 'react-native-ratings';

import Shimmer from 'react-native-shimmer-placeholder'

class ShopItem extends Component {
  render() {
    if(this.props.nulled) {
      return(
        <ListItem thumbnail style={{marginBottom:10}}>
          <Left>
            <Shimmer autoRun={true} style={{width:72, height:72}}/>
          </Left>
          <Body style={{marginRight:20}}>
            <Shimmer autoRun={true} style={{width:'100%', height:20}}/>
          </Body>
        </ListItem>
      )
    }
    let { shop, navigation } = this.props;
    return(
      <ListItem button thumbnail style={{marginBottom:10}}>
        <Left>
          <Thumbnail square source={{ uri: shop.image }} style={{width:72, height:72}}/>
        </Left>
        <Body>
          <Text numberOfLines={1}>{shop.name}</Text>
        </Body>
      </ListItem>
    )
  }
}

export default ShopItem;
