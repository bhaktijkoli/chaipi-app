import React, { Component } from 'react';
import { Container, Content, View, Title, Text} from 'native-base';
import { Header } from 'native-base';
import firebase from 'react-native-firebase';

import OfferItemList from './OfferItemList';
import SubscriptionList from './SubscriptionList';

import Footer from './../../components/Footer'

import Style from './../../styles/style';

class Home extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header transparent>
        </Header>
        <Content>
          <OfferItemList />
          <SubscriptionList />
        </Content>
        <Footer tab='home' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

export default Home;
