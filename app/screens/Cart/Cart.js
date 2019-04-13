import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base';

import Header from './../../components/Header'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

import CartItem from './CartItem';

class Cart extends Component {
  render() {
    let carts = this.props.auth.cart;
    return(
      <Container>
        <Header title={`Your Cart(${carts.length})`}/>
        <Content>
          <FlatList
            data={carts}
            renderItem={({item, index}) => { return <CartItem cart={item} update={this.update.bind(this)} /> }}
            keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </Content>
        <Footer tab='cart' navigation={this.props.navigation}/>
      </Container>
    )
  }
  update() {
    Auth.getCart(this);
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Cart);
