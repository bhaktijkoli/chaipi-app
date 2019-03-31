import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text, List} from 'native-base';

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
          <List>
            {
              carts.map((el, key) => {
                return <CartItem order={el} key={key}/>
              })
            }
          </List>
        </Content>
        <Footer tab='cart' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Cart);
