import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'native-base';
import { Rating } from 'react-native-ratings';

import ShopItem from './ShopItem';

import Style from './../../styles/style';
import Request from './../../utils/request';

class ShopList extends Component {
  state = {
    shops: null,
  }
  componentDidMount() {
    Request.get('/shop/get')
    .then(res => {
      console.log(res.data);
      setTimeout(function () {
        this.setState({shops: res.data});
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
    if(this.state.shops == null) {
      var counts = [0,1,2,3,4,5,6];
      return counts.map((el, key) => {
        return(
          <ShopItem shop={el} key={key} nulled/>
        )
      });
    } else {
      return this.state.shops.map((el, key) => {
        return(
          <ShopItem shop={el} key={key} navigation={this.props.navigation}/>
        )
      });
    }

  }
}

export default ShopList;
