import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text, Left, Icon, Right, Card} from 'native-base';
import firebase from 'react-native-firebase';

import OfferItemList from './OfferItemList';
import SubscriptionList from './SubscriptionList';
import ShopList from './ShopList';

import Header3 from './../../components/Header3'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import ws from './../../utils/ws';
import { DrawerNavigator } from 'react-navigation';

class Home extends Component {
  componentDidMount() {
    Auth.getCart();
    Auth.getAddress();
    Auth.getCards();
    Auth.getFavorites();
  }
  render() {
    return(
      <Container>
        <Header3 auth={this.props.auth}/>
        <Content>
          <Text style={Style.homeheading}>Offers</Text>
          <OfferItemList />
          <Text style={Style.homeheading}>Subscriptions</Text>
          <SubscriptionList navigation={this.props.navigation}/>
          <Text style={Style.homeheading}>Shops</Text>
          <ShopList navigation={this.props.navigation}/>
        </Content>
        <Footer tab='home' navigation={this.props.navigation} auth={this.props.auth}/>
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
