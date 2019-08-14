import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, FlatList } from 'react-native';
import {If, Then, Else} from 'react-if';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text } from 'native-base';

import Header2 from './../../../components/Header2';
import SpinnerBox from './../../../components/SpinnerBox';
import ButtonEx from './../../../components/Button'
import Request from './../../../utils/request';;
import Style from './../../../styles/style';

import OrderItem from './OrderItem';

class OrderHistory extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    Request.get('/order/get').then(res => {
      console.log(res.data);
      this.setState({orders: res.data, loading: false});
    });
  }
  render() {
    return(
      <Container>
        <Header2 title="Your Orders"/>
        <If condition={this.state.loading}>
          <Then>
            <SpinnerBox />
          </Then>
          <Else>
            <ScrollView style={Style.content}>
              <FlatList
                data={this.state.orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => {return <OrderItem item={item} navigation={this.props.navigation}/>}}
                  >
                </FlatList>
            </ScrollView>
          </Else>
        </If>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(OrderHistory);
