import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import OfferItem from './OfferItem';

import Request from './../../utils/request';
import Style from './../../styles/style';

class OfferItemList extends Component {
  state = {
    offers: null,
  }
  componentDidMount() {
    Request.get('/offer/get')
    .then(res => {
      setTimeout(function () {
        this.setState({offers:res.data});
      }.bind(this), 500);
    })
    .catch(err => console.error(err));
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
    if(this.state.offers == null) {
      let counts = [0,1,2,3,4,5];
      return counts.map((el, key) => {
        return <OfferItem key={key} nulled/>
      })
    } else {
      return this.state.offers.map((el, key) => {
        return <OfferItem key={key} offer={el}/>
      })
    }
  }
}

export default OfferItemList;
