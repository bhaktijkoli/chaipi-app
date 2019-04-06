import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { List } from 'native-base';
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
  renderList() {
    if(this.state.subscriptions == null) {
      var counts = [0,1,2,3,4,5,6];
      return counts.map((el, key) => {
        return(
          <SubscriptionItem subscription={el} key={key} nulled/>
        )
      });
    } else {
      return this.state.subscriptions.map((el, key) => {
        return(
          <SubscriptionItem subscription={el} key={key} navigation={this.props.navigation}/>
        )
      });
    }

  }
}

export default SubscriptionList;
