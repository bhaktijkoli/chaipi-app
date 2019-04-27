import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList, StyleSheet, Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import Header from './../../components/Header'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

import CartItem from './CartItem';

import CartLogo from './../../assets/cart_empty.svg';

class Cart extends Component {
  render() {
    let carts = this.props.auth.cart;
    if(carts.length == 0) return this.renderEmptyCart();
    let total = 0;
    carts.forEach(el => {
      total = el.product.price * el.count
    });
    return(
      <Container>
        <Header title={`Your Cart(${carts.length})`}/>
        <Content>
          <FlatList
            data={carts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return <CartItem cart={item} update={this.update.bind(this)}></CartItem>
            }}>
          </FlatList>
          <Grid style={CustomStyle.billContainer}>
            <Row>
              <Text style={Style.heading}>Bill Details</Text>
            </Row>
            <Row style={{paddingTop:5,paddingBottom:5}}>
              <Col>
                <Text style={CustomStyle.billItem}>Item Total</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;{total}</Text>
              </Col>
            </Row>
            <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
              <Col>
                <Text style={CustomStyle.billItem}>Delivery Fee</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;10</Text>
              </Col>
            </Row>
            <Row style={[Style.upperBorder, {paddingTop:5,paddingBottom:5}]}>
              <Col>
                <Text style={CustomStyle.billItem}>To Pay</Text>
              </Col>
              <Col>
                <Text style={CustomStyle.billCost}>&#8377;{total+10}</Text>
              </Col>
            </Row>
            <Row style={{paddingTop:10,paddingBottom:10}}>
              <Col>
                <Button block success>
                  <Text>Proceed</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer tab='cart' navigation={this.props.navigation}/>
      </Container>
    )
  }
  update() {
    Auth.getCart(this);
  }
  renderEmptyCart() {
    return(
      <Container>
        <Header title={`Your Cart`}/>
        <View style={{alignItems:'center'}}>
          <Image source={require('./../../assets/empty_cart.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
          <Text style={Style.lightColor}>Your cart is empty.</Text>
        </View>
      </Container>
    )
  }
}

const CustomStyle = StyleSheet.create({
  billContainer: {
    padding: 10,
  },
  billItem: {

  },
  billCost: {
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
  checkoutContainer: {
    borderTopWidth: 0.2,
    padding: 15,
    borderColor: '#000'
  }
})


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Cart);
