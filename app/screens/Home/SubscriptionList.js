import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'native-base';
import { Rating } from 'react-native-ratings';

import SubscriptionItem from './SubscriptionItem';

import Style from './../../styles/style';
import Request from './../../utils/request';

class SubscriptionList extends Component {
  state = {
    subscriptions: null,
  }
  componentDidMount() {
    Request.get('/subscription/get')
    .then(res => {
      setTimeout(function () {
        this.setState({subscriptions: res.data});
      }.bind(this), 500);
    })
    .catch(err => console.error(err))
  }
  render() {
    return(
      <ScrollView>
        <List>
          {this.renderList()}
        </List>
      </ScrollView>
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
