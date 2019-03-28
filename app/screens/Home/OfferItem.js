import React, { Component } from 'react';
import { Image } from 'react-native';
import Style from './../../styles/style';

import Shimmer from 'react-native-shimmer-placeholder'

class OfferItem extends Component {
  componentDidMount() {
  }
  render() {
    if(this.props.nulled) {
      return(
        <Shimmer autoRun={true} style={{width:174,height:124, marginLeft:5, marginRight:5}}>
        </Shimmer>
      )
    } else {
      let offer = this.props.offer;
      return(
        <Image source={{ uri: offer.image }} style={{width:174,height:124, marginLeft:5, marginRight:5}}/>
      )
    }
  }
}

export default OfferItem;
