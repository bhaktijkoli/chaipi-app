import React, { Component } from 'react';

import Style from './../../styles/style';

import Shimmer from 'react-native-shimmer-placeholder'

class OfferItem extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Shimmer autoRun={true} style={{width:174,height:124, marginLeft:5, marginRight:5}}>
      </Shimmer>
    )
  }
}

export default OfferItem;
