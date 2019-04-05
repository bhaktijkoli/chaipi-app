import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Style from './../../styles/style';

import Shimmer from 'react-native-shimmer-placeholder'

class OfferItem extends Component {
  state = {
    loaded: false,
  }
  componentDidMount() {
  }
  render() {
    let offer = this.props.offer;
    return(
      <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
        <Image source={{ uri: offer.image }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
      </Shimmer>
    )
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
