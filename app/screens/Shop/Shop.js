import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Button, Text, H1} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { If } from 'react-if';

import Header2 from './../../components/Header2';
import CartButton from './../../components/CartButton';

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

class Shop extends Component {
  state = {
    products: [],
  }
  componentDidMount() {
    let shop = this.props.navigation.getParam('shop');
    Request.get('/product/get?shop='+shop.id)
    .then(res => {
      setTimeout(function () {
        this.setState({products: res.data});
      }.bind(this), 500);
    })
    .catch(err => console.error(err))
  }
  render() {
    let shop = this.props.navigation.getParam('shop');
    return(
      <Container>
        <Header2 title={shop.name}/>
        <Content style={{padding:5}}>
          <FlatList
            numColumns={2}
            data={this.state.products}
            renderItem={({item, index}) => { return this.renderProductItem(item, index) }}
            keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </Content>
      </Container>
    )
  }
  renderProductItem(item, key) {
    let cart = this.getCartItem(item.id);
    return(
      <View style={{margin:10}}>
        <TouchableOpacity>
          <Image source={{uri: item.image}} style={{height:124, width:this.getItemWidth()}}/>
          <Text style={{fontSize:16, marginTop:5}}>{item.name}</Text>
        </TouchableOpacity>
        <Grid style={{marginTop:5}}>
          <Col>
            <If condition={cart==null}>
              <Button bordered small onPress={e => this.onAddClick(item)}>
                <Text>Add</Text>
              </Button>
            </If>
            <If condition={cart!=null}>
              <CartButton cart={cart} update={this.updateCart.bind(this)}/>
            </If>
          </Col>
          <Col>
            <Text style={[{fontSize:14, alignSelf: 'flex-end'}, Style.lightColor]}>&#8377;{item.price}</Text>
          </Col>
        </Grid>
      </View>
    )
  }
  onAddClick(item) {
    let data = {
      product: item.id,
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
    for(var i=0;i<items.length;i++) {
      if(items[i].product.id == pid) {
        return items[i];
      }
    }
    return null;
  }
  updateCart() {
    Auth.getCart(this);
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Shop);
