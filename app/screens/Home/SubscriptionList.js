import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Rating } from 'react-native-ratings';

import SubscriptionItem from './SubscriptionItem';

import Style from './../../styles/style';
import Request from './../../utils/request';

class SubscriptionList extends Component {
  state = {
    loading: true,
    subscriptions: [1,2,3,4,5,6],
  }
  componentDidMount() {
    Request.get('/product/get?type=subscription')
    .then(res => {
      this.setState({subscriptions: res.data, loading: false});
    })
    .catch(err => console.error(err))
  }
  render() {
    return(
      <FlatList
        style={{marginLeft:5, marginRight:5}}
        data={this.state.subscriptions}
        renderItem={({item, index}) => { return <SubscriptionItem subscription={item} navigation={this.props.navigation} nulled={this.state.loading}/> }}
        keyExtractor={(item, index) => index.toString()}
        >
      </FlatList>
    )
  }
}

export default SubscriptionList;
