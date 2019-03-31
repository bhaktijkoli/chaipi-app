import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text} from 'native-base';
import firebase from 'react-native-firebase';

import OfferItemList from './OfferItemList';
import SubscriptionList from './SubscriptionList';

import Header from './../../components/Header'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Style from './../../styles/style';

class Home extends Component {
  componentDidMount() {
    Auth.getCart(this);
  }
  render() {
    return(
      <Container>
        <Header title="NOW"/>
        <Content>
          <Text style={Style.homeLabel}>Offers</Text>
          <OfferItemList />
          <Text style={Style.homeLabel}>Subscriptions</Text>
          <SubscriptionList navigation={this.props.navigation}/>
        </Content>
        <Footer tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
