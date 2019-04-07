import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Rating } from 'react-native-ratings';

import ShopItem from './ShopItem';

import Style from './../../styles/style';
import Request from './../../utils/request';

class ShopList extends Component {
  state = {
    loading: true,
    shops: [1,2,3,4,5,6],
  }
  componentDidMount() {
    Request.get('/shop/get')
    .then(res => {
      this.setState({shops: res.data, loading: false});
    })
    .catch(err => console.error(err))
  }
  render() {
    return(
      <FlatList
        style={{marginLeft:5, marginRight:5}}
        data={this.state.shops}
        renderItem={({item, index}) => { return <ShopItem shop={item} navigation={this.props.navigation} nulled={this.state.loading}/> }}
        keyExtractor={(item, index) => index.toString()}
        >
      </FlatList>
    )
  }
}

export default ShopList;
