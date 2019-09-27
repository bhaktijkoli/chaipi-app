import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Button, Text, H1, Toast} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import { If } from 'react-if';
import Shimmer from 'react-native-shimmer-placeholder'

import CartButton from './../../components/CartButton';

import Style from './../../styles/style';
import Request from './../../utils/request';

class ShopItem extends Component {
  state = {
    loaded: false,
  }
  render() {
    let { product } = this.props;
    let cart = this.getCartItem(product.id);
    return(
      <View style={{margin:10}}>
        <TouchableOpacity>
          <Shimmer autoRun={true} visible={this.state.loaded} style={{height:124, width:this.getItemWidth()}}>
            <Image source={{uri: Request.url(product.image)}} style={{height:124, width:this.getItemWidth()}} onLoad={e=>this.setState({loaded:true})}/>
          </Shimmer>
          <Text style={{fontSize:16, marginTop:5}}>{product.name}</Text>
        </TouchableOpacity>
        <Grid style={{marginTop:5}}>
          <Col>
            <If condition={cart==null}>
              <Button bordered small onPress={e => this.onAddClick(product)}>
                <Text>Add</Text>
              </Button>
            </If>
            <If condition={cart!=null}>
              <CartButton cart={cart} update={this.updateCart.bind(this)}/>
            </If>
          </Col>
          <Col>
            <Text style={[{fontSize:14, alignSelf: 'flex-end'}, Style.lightColor]}>&#8377;{product.price}</Text>
          </Col>
        </Grid>
      </View>
    )
  }
  onAddClick(product) {
    let cart =this.props.auth.cart;
    if(cart.length > 0) {
      if(product.shopId != cart[0].shopId) {
        Alert.alert(
          'Replace cart item?',
          `Your cart contains items from ${cart[0].shop.name}. Do you want to discard the selection and add items from ${product.shop.name}?`,
          [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => this.sendRequest(product)},
          ],
          {cancelable: false},
        )
        return;
      }
      
    }
    this.sendRequest(product);
  }
  sendRequest = (product) => {
    let data = { product: product.id, count: 1 }
    Request.post('/cart/add', data)
    .then(res => {
      this.props.update();
    })
    .catch(err => {
      console.error(err);
    })
  }
  getItemWidth() {
    let {width} = Dimensions.get('window');
    return width/2-25;
  }
  getCartItem(pid) {
    let items = this.props.auth.cart;
    for(var i=0; i<items.length; i++) {
      if(items[i].product.id == pid) return items[i];
    }
    return null;
  }
  updateCart() {
    this.props.update();
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ShopItem);
