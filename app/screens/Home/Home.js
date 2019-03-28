import React, { Component } from 'react';
import { Container, Content, View, Title, Text} from 'native-base';
import firebase from 'react-native-firebase';

import OfferItemList from './OfferItemList';
import SubscriptionList from './SubscriptionList';

import Header from './../../components/Header'
import Footer from './../../components/Footer'

import Style from './../../styles/style';

class Home extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header title="NOW"/>
        <Content>
          <Text style={Style.homeLabel}>Offers</Text>
          <OfferItemList />
          <Text style={Style.homeLabel}>Subscriptions</Text>
          <SubscriptionList />
        </Content>
        <Footer tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

export default Home;
