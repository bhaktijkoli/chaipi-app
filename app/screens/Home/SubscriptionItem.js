import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { Rating } from 'react-native-ratings';

import Shimmer from 'react-native-shimmer-placeholder'

class SubscriptionItem extends Component {
  render() {
    if(this.props.nulled) {
      return(
        <ListItem thumbnail style={{marginBottom:10}}>
          <Left>
            <Shimmer autoRun={true} style={{width:72, height:72}}/>
          </Left>
          <Body style={{marginRight:20}}>
            <Shimmer autoRun={true} style={{width:'100%', height:20}}/>
            <Shimmer autoRun={true} style={{width:'100%', height:18, marginTop: 5}}/>
            <Shimmer autoRun={true} style={{width: 80, height:14, marginTop: 2}}/>
          </Body>
        </ListItem>
      )
    }
    let { subscription, navigation } = this.props;
    return(
      <ListItem button thumbnail style={{marginBottom:10}} onPress={e => navigation.navigate('Subscription', {subscription})}>
        <Left>
          <Thumbnail square source={{ uri: subscription.image }} style={{width:72, height:72}}/>
        </Left>
        <Body>
          <Text numberOfLines={1}>{subscription.name}</Text>
          <Text numberOfLines={1} note>{subscription.description}</Text>
          <Rating readonly imageSize={14} startingValue={subscription.rating} style={{alignItems:'flex-start'}}/>
        </Body>
      </ListItem>
    )
  }
}

export default SubscriptionItem;
