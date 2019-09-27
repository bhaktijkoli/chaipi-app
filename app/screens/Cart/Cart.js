import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Title, Button, Toast } from 'native-base';
import { List, ListItem } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { If, Then, Else } from 'react-if';

import Header from './../../components/Header4'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

import CartItem from './CartItem';

import CartLogo from './../../assets/cart_empty.svg';

class Cart extends Component {
  state = {
    current_address: null,
    addressModalVisible: false,
  }
  componentDidMount() {
    if(this.props.auth.addresses[0]) {
      this.setState({current_address: this.props.auth.addresses[0]});
    };
  }
  render() {
    let carts = this.props.auth.cart;
    if(carts.length == 0) return this.renderEmptyCart();
    let total = 0;
    carts.forEach(el => {
      total += el.product.price * el.count
    });
    let {current_address} = this.state;
    let current_address_formated = "";
    if(current_address) {
      current_address_formated = `${current_address.house}, ${current_address.landmark}, ${current_address.address}`;
    }
    this.renderAddressList()
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
            <Row style={{paddingTop:20,paddingBottom:5}}>
              <Text style={Style.heading}>Deliver to</Text>
            </Row>
            <If condition={current_address != null}>
              <Then>
                <Row style={{paddingTop:5,paddingBottom:5}}>
                  <Text>{current_address_formated}</Text>
                </Row>
                <Row style={{paddingBottom:5}}>
                  <Button primary border small onPress={e=>this.setState({addressModalVisible: true})}><Text>Change</Text></Button>
                </Row>
              </Then>
              <Else>
                <Row style={{paddingTop:5,paddingBottom:5}}>
                  <Button primary border small onPress={e=> this.props.navigation.navigate('AddAddress', {cart: 1})}>
                    <Text>Add Address</Text>
                  </Button>
                </Row>
              </Else>
            </If>
            <Row style={{paddingTop:10,paddingBottom:10, alignSelf:'flex-end'}}>
              <Col>
                <Button block success large onPress={this.onProceed.bind(this)}>
                  <Text>Proceed</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer tab='cart' navigation={this.props.navigation} auth={this.props.auth}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addressModalVisible}>
          <View style={CustomStyle.addressModalContainer}>
            <View style={CustomStyle.addressModal}>
              <View>
                <Title>Select Address</Title>
                <List>
                  {this.renderAddressList()}
                </List>
                <Button full primary style={{marginTop:20}} onPress={e=>{
                    this.setState({addressModalVisible: false})
                    this.props.navigation.navigate('AddAddress', {cart:1})
                  }}>
                  <Text>ADD ADDRESS</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    )
  }
  update() {
    Auth.getCart();
  }
  renderEmptyCart() {
    return(
      <Container>
        <Content>
        <Header title={`Your Cart`}/>
        <View style={{alignItems:'center'}}>
          <Image source={require('./../../assets/empty_cart.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
          <Text style={Style.lightColor}>Your cart is empty.</Text>
        </View>
        </Content>
        <Footer tab='cart' navigation={this.props.navigation} auth={this.props.auth}/>
      </Container>
    )
  }
  renderAddressList() {
    return this.props.auth.addresses.map((el, key) => {
      return(
        <ListItem key={key} onPress={e=>this.setState({addressModalVisible:false, current_address: el})}>
          <Text>{el.house}, {el.landmark}, {el.location}</Text>
        </ListItem>
      )
    })
  }
  onProceed() {
    if(!this.state.current_address) {
      Toast.show({text:"Select delivery address.", buttonText:'Ok'});
    } else {
      this.props.navigation.navigate('SelectPayment', {address:this.state.current_address})
    }
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
  },
  addressModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000000d'
  },
  addressModal: {
    marginTop: 200,
    backgroundColor: 'white',
    height: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  }
})


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Cart);
