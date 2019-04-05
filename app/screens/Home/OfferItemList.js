import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import OfferItem from './OfferItem';

import Request from './../../utils/request';
import Style from './../../styles/style';

class OfferItemList extends Component {
  state = {
    offers: [],
  }
  componentDidMount() {
    Request.get('/offer/get')
    .then(res => {
      this.setState({offers:res.data});
    })
    .catch(err => console.error(err));
  }
  render() {
    return(
      <FlatList
        style={{marginLeft:5, marginRight:5}}
        horizontal={true}
        data={this.state.offers}
        renderItem={({item, index}) => { return <OfferItem offer={item} /> }}
        keyExtractor={(item, index) => index.toString()}
        >
      </FlatList>
    )
  }
}

export default OfferItemList;
