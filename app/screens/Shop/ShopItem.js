import React, { Component } from 'react';
import { Container, Content, View, Title, Button, Text, H1} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
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
            <Image source={{uri: product.image}} style={{height:124, width:this.getItemWidth()}} onLoad={e=>this.setState({loaded:true})}/>
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
    let data = {
      product: product.id,
      count: 1,
    }
    Request.post('/order/add', data)
    .then(res => {
      console.log(res.data);
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

  }
}

export default ShopItem;
