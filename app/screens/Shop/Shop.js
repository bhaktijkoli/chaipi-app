import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, Button, Icon, View, Badge, Text, BadgedIcon, Footer, } from 'native-base';
import { FlatList } from 'react-native';
import { If } from 'react-if';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, Modal } from 'react-native';

import Header2 from './../../components/Header2';
import Withbadge from './../../components/Withbadge';
import CartButton from './../../components/CartButton';

import ShopItem from './ShopItem';

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Shop extends Component {
  //BadgedIcon = Withbadge()(Icon);
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
    let carts = this.props.auth.cart;
    let shop = this.props.navigation.getParam('shop');
    let cartCount = this.props.auth.cart.length;
    let total = 0;
    carts.forEach(el => {
      total += el.product.price * el.count
    });
    return(
      <Container>
        <Header2 title={shop.name} right={this.headerRight}/>
        <Content style={{padding:5}}>
          <FlatList
            numColumns={2}
            data={this.state.products}
            renderItem={({item, index}) => { return <ShopItem product={item} update={this.update.bind(this)} auth={this.props.auth}/> }}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
          {/*<If  condition={cartCount>0}>
          <TouchableOpacity onPress={e=>this.onClick('Cart')}>
          <View style = {{flexDirection: 'row', backgroundColor: '#ffa500'}}> 
            <Grid style={{padding: 10,}}>
            <Row style={{alignItems: 'center'}}>
            <Col>
            <Text style={{fontWeight: '500',alignSelf: 'flex-start', marginLeft: 15, color: '#ffffff'}}>&#8377;{total}</Text>
            </Col>
            <Col>
            <Text style = {{color: '#ffffff', alignSelf: 'center'}}>View Cart</Text>
            </Col>
            <Col>
            <Button style = {{alignSelf: 'flex-end', color: '#ffffff', marginRight: 15}} transparent  badge={cartCount>0} onPress={e=>this.onClick('Cart')}>
              <If condition={cartCount>0}>
              <Badge primary style = {{alignSelf: 'center'}}><Text>{cartCount}</Text></Badge>
              </If>
            </Button>
            </Col>
            </Row>
            </Grid>
          </View>
          </TouchableOpacity>
    </If>*/}
        </Content>
        <View>
          <If condition={cartCount>0}>
          <TouchableOpacity onPress={e=>this.onClick('Cart')}>
            <Footer>
              <View style={customStyle.orderView}>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: '500',alignSelf: 'flex-start', marginLeft: 15, color: '#ffffff'}}>&#8377;{total}</Text>
                </View>
                <View style = {{flex: 1}}>
                  <Text style = {{color: '#ffffff', alignSelf: 'center'}}>View Cart</Text>
                </View>
                <View style={{flex: 1}}>
                  <Button style = {{alignSelf: 'flex-end', color: '#ffffff', marginRight: 15}} transparent  badge={cartCount>0} onPress={e=>this.onClick('Cart')}>
                    <If condition={cartCount>0}>
                      <Badge primary style = {{alignSelf: 'center'}}><Text>{cartCount}</Text></Badge>
                    </If>
                  </Button>
                </View>
                </View>
              </Footer>
              </TouchableOpacity>
            </If>
            </View>
      </Container>
    )
  }
  update() {
    Auth.getCart();
  }
  headerRight = () => {
    let shop = this.props.navigation.getParam('shop');
    let cartCount = this.props.auth.cart.length;
    let active = false;
    this.props.auth.favorites.forEach(s => {
      if(s.shopId == shop.id && s.active == 1) active = true;
    })
    let icon = active?'heart':'hearto';
    return(
      <Button transparent>
        {/*<Icon name="shoppingcart" type="AntDesign" style={{color:'black', padding: 10}} onPress={e=>this.onClick('Cart')}/> */}
        <Icon name={icon} type="AntDesign" style={{color:'red'}} onPress= {this.onFavoriteToggle}/>
      </Button>
      /*<View style = {{flexDirection: 'row'}}>
      <Button transparent  badge={cartCount>0} onPress={e=>this.onClick('Cart')}>
        <If condition={cartCount>0}>
          <Badge primary style = {{alignSelf: 'center', position:'absolute', top: 2, right:-5, height:20, width: 35}}><Text>{cartCount}</Text></Badge>
        </If>
        <Icon name="shoppingcart" type="AntDesign" style={{color:'black'}}/> 
      </Button>
      <Button transparent onPress= {this.onFavoriteToggle}>
      <Icon name={icon} type="AntDesign" style={{color:'red'}}/>
      </Button>
    </View>*/
    )
  }
  onFavoriteToggle = () => {
    let shop = this.props.navigation.getParam('shop');
    Request.post('/favorite/toggle', {shop: shop.id}).then(res => {
      Auth.getFavorites();
    })
  }
  onClick(menu) {
    this.props.navigation.navigate(menu);
  }
}

const customStyle = StyleSheet.create({
  orderView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffa500'
  }
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Shop);
