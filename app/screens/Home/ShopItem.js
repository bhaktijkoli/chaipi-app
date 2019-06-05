import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import Shimmer from 'react-native-shimmer-placeholder';

import Request from './../../utils/request';

class ShopItem extends Component {
  state = {
    loaded: false,
  }
  render() {
    let { shop, navigation, nulled } = this.props;
    if(nulled) {
      return(
        <View style={{flexDirection: 'row'}}>
          <Shimmer autoRun={true} style={CustomStyle.image}>
          </Shimmer>
          <View style={{flexDirection: 'column'}}>
            <Shimmer autoRun={true} style={CustomStyle.title}>
            </Shimmer>
            <Shimmer autoRun={true} style={CustomStyle.note}>
            </Shimmer>
          </View>
        </View>
      )
    }
    return(
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={e => navigation.navigate("Shop", {shop})}>
        <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
          <Image source={{ uri: Request.url(shop.image) }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
        </Shimmer>
        <View style={{flexDirection: 'column'}}>
          <Text numberOfLines={1} style={CustomStyle.title}>{shop.name}</Text>
          <Text numberOfLines={1} style={CustomStyle.note} note>{shop.description}</Text>
        </View>
      </TouchableOpacity>
    )
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
})

export default ShopItem;
