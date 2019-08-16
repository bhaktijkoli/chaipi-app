import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

import OrderHistoryForm from './OrderHistoryForm';

class OrderHistory extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Your Orders"/>
        <ScrollView style={Style.content}>
        <OrderHistoryForm auth={this.props.auth} navigation={this.props.navigation}/>

        </ScrollView>
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
