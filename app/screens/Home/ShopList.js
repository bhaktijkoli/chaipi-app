import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import ShopItem from './ShopItem';

import Style from './../../styles/style';
import Request from './../../utils/request';
import Auth from './../../actions/authActions';
import { List, ListItem } from 'native-base';

class ShopList extends Component {
  constructor(props){
    super(props)
    this.state = {
      types: [],
    }
  }
  componentDidMount() {
    Auth.getShops();

    Request.get('/shoptype/get')
    .then(res => {
      let types = res.data;
      types.unshift({name: "ALL"});
      this.setState({types});
    })
  }
  render() {
    return(
      <View>
        <FlatList
          horizontal={true}
          data={this.state.types}
          keyExtractor = {(item, index) => item.toString()}
          renderItem={(itemData) => { return (
            <TouchableOpacity style={customStyle.item} onPress={e => Auth.getShops(itemData.item.name)}>
              <Text style={customStyle.itemText}>{itemData.item.name}</Text>
            </TouchableOpacity>
          )}}
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

  const customStyle = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      marginBottom: 10,
      backgroundColor: '#ffa500',
      color: '#ffffff',
      marginLeft: 10,
      marginRight: 10,
    },
    itemText: {
      color: '#FFF',
    }
  })

  export default ShopList;
