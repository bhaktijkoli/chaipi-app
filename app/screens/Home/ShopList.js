import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'native-base';

import ShopItem from './ShopItem';

import Style from './../../styles/style';
import Request from './../../utils/request';
import Auth from './../../actions/authActions';

class ShopList extends Component {
  componentDidMount() {
    Auth.getShops();
  }
  render() {
    return(
      <FlatList
        style={{marginLeft:5, marginRight:5}}
        data={this.props.auth.shops}
        renderItem={({item, index}) => { return <ShopItem shop={item} navigation={this.props.navigation} nulled={this.props.auth.shops_loading}/> }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this.emptyList}
        >
      </FlatList>
    )
  }
  emptyList = () => {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
        <Text>Sorry we are not serving in this Area</Text>
      </View>
    )
  }
}

export default ShopList;
