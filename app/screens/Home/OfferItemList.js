import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import OfferItem from './OfferItem';

import Style from './../../styles/style';

class OfferItemList extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection:'row'}}>
          {this.renderList()}
        </View>
      </ScrollView>
    )
  }
  renderList() {
    let counts = [0,1,2,3,4,5];
    return counts.map((el, key) => {
      return <OfferItem key={key}/>
    })
  }
}

export default OfferItemList;
