import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';
import Style from './../../styles/style';

import Shimmer from 'react-native-shimmer-placeholder'

import Request from './../../utils/request';

class OfferItem extends Component {
  state = {
    loaded: false,
  }
  componentDidMount() {
  }
  render() {
    let offer = this.props.offer;
    let uri = offer.image;
    console.log(uri);
    return(
      //<TouchableOpacity style={{flexDirection: 'row'}} onPress={e=>this.onClick('Offer')}>
      <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
        <Image source={{ uri }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
      </Shimmer>
      //</TouchableOpacity>
    )
  }
  onClick() {
    this.props.navigation.navigate();
  }
}

const CustomStyle = StyleSheet.create({
  image: {
    width:174,
    height:124,
    marginLeft:5,
    marginRight:5
  }
})


export default OfferItem;
