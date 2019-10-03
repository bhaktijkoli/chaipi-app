import React, { Component } from 'react';
import { FlatList, StyleSheet, } from 'react-native';
import { View, Text } from 'native-base';

import ShopItem from './ShopItem';

import Style from './../../styles/style';
import Request from './../../utils/request';
import Auth from './../../actions/authActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, ListItem } from 'native-base';

class ShopList extends Component {
  constructor(props){
    super(props)
    this.state = {
      types: [],
    }
  }

 /*renderItem = (itemData) => {
 return (
 <Text style={customStyle.item}>{itemData.item.name}</Text>
)
}*/

  componentDidMount() {
    Auth.getShops();

      Request.get('/shoptype/get')
        .then(res => {
          let type = "";
          if(res.data.length > 0) type = res.data[0];
          this.setState({types: res.data, type});
        })
  }
  render() {
    return(
      <View>
      <FlatList
        horizontal={true}
        data={this.state.types}
        keyExtractor = {(item, index) => item.toString()}
        //renderItem={this.renderItem}
        renderItem={(itemData) => { return (<Text style={customStyle.item}>{itemData.item.name}</Text>)}}
        >
      </FlatList>
      <FlatList
        style={{marginLeft:5, marginRight:5}}
        data={this.props.auth.shops}
        renderItem={({item, index}) => { return <ShopItem shop={item} navigation={this.props.navigation} nulled={this.props.auth.shops_loading}/> }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={this.emptyList}
        >
      </FlatList>
      </View>
    )
  }
}

const Data=[
  {id: 1, key: 'Tea/Coffee Shop'},
  {id: 2, key: 'Snacks Shop'},
  {id: 3, key: 'Dairy Shop'},
  {id: 4, key: 'Grocery Shop'},
  {id: 5, key: 'Vegetable Shop'},
  {id: 6, key: 'Other Shop'},
  ]

const customStyle = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#ffa500',
    color: '#ffffff',
  },
})

export default ShopList;
