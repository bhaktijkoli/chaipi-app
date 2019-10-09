import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import Offeritem from './Offeritem';

import Style from './../../styles/style';
import Request from './../../utils/request';

class Offer extends Component {

  componentDidMount() {
    let offer = this.props.navigation.getParam('offer');
    Request.get('/offer/get')
    .then(res => {
      this.setState({offers:res.data});
    })
    .catch(err => console.error(err));
  }
  render() {
    let offer = this.props.navigation.getParam('offer');
    return(
      <View>
        <FlatList
          style={{marginLeft:5, marginRight:5}}
          data={this.state.offer}
          renderItem={({item, index}) => { return <Offeritem offer={item} navigation={this.props.navigation} nulled={this.props.auth.offer_loading}/> }}
            keyExtractor={(item, index) => index.toString()}
            >
          </FlatList>
        </View>
      )
    }
  }


  export default Offer;
