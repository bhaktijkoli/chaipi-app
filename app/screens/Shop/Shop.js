import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, Button, Icon } from 'native-base';
import { FlatList } from 'react-native';
import { If } from 'react-if';

import Header2 from './../../components/Header2';
import CartButton from './../../components/CartButton';

import ShopItem from './ShopItem';

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
        <Header2 title={shop.name} right={this.headerRight}/>
        <Content style={{padding:5}}>
          <FlatList
            numColumns={2}
            data={this.state.products}
            renderItem={({item, index}) => { return <ShopItem product={item} update={this.update.bind(this)} auth={this.props.auth}/> }}
            keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </Content>
      </Container>
    )
  }
  update() {
    Auth.getCart();
  }
  headerRight = () => {
    let shop = this.props.navigation.getParam('shop');
    let active = false;
    this.props.auth.favorites.forEach(s => {
      if(s.shopId == shop.id && s.active == 1) active = true;
    })
    let icon = active?'heart':'hearto';
    return(
      <Button transparent>
        <Icon name="shoppingcart" type="AntDesign" style={{color:'black', padding: 10}} onPress={e=>this.onClick('Cart')}/>
        <Icon name={icon} type="AntDesign" style={{color:'red'}} onPress= {this.onFavoriteToggle}>
        </Icon>
      </Button>
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Shop);
