import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { List, ListItem } from 'native-base';
import { If } from 'react-if'

import Footer from './../../components/Footer'

import Style from './../../styles/style';

class Account extends Component {
  componentDidMount() {
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    let shop = this.props.auth.shop;
    return(
      <Container>
        <Content>
          <Header transparent>
            <Left>
              <Text style={{marginLeft:15,color:'#000'}}>{user.fullname.toUpperCase()}</Text>
              <Text style={{marginLeft:15,color:'#000'}}>{phone}</Text>
            </Left>
          </Header>
          <List>
            <ListItem itemDivider>
              <Text>My Account</Text>
            </ListItem>
            {this.renderSettingItems(accountItems)}
            <If condition={shop!=null}>
              <ListItem itemDivider>
                <Text>My Shop</Text>
              </ListItem>
            </If>
            {this.renderSettingItems(shopManagementItems, shop!=null)}
            <ListItem itemDivider>
              <Text>Help</Text>
            </ListItem>
            {this.renderSettingItems(helpItems)}
          </List>
        </Content>
        <Footer tab='account' navigation={this.props.navigation}/>
      </Container>
    )
  }
  renderSettingItems(arrayItems, condition=true) {
    if(condition) {
      return arrayItems.map((el, key) => {
        return(
          <ListItem key={key} onPress={e=>this.onClickListItem(el.route)}>
            <Left>
              <Icon name={el.icon} type={el.type}/>
            </Left>
            <Body style={{flex:6}}>
              <Text>{el.name}</Text>
            </Body>
          </ListItem>
        )
      })
    }
    else {
      return null;
    }
  }
  onClickListItem(route) {
    this.props.navigation.navigate(route);
  }
}

const accountItems = [
  {name: 'Profile', icon: 'user', route: 'Home', type: 'AntDesign'},
  {name: 'Address', icon: 'enviromento', route: 'Home', type: 'AntDesign'},
  {name: 'Payment', icon: 'creditcard', route: 'Home', type: 'AntDesign'},
  {name: 'Favorites', icon: 'hearto', route: 'Home', type: 'AntDesign'},
  {name: 'Order History', icon: 'clockcircleo', route: 'Home', type: 'AntDesign'},
  {name: 'App Settings', icon: 'setting', route: 'Home', type: 'AntDesign'},
  {name: 'Logout', icon: 'logout', route: 'Logout', type: 'AntDesign'},
];

const shopManagementItems = [
  {name: 'Shop', icon: 'shop', route: 'Home', type: 'Entypo'},
  {name: 'Products', icon: 'profile', route: 'Products', type: 'AntDesign'},
];

const helpItems = [
  {name: 'Help', icon: 'questioncircleo', route: 'Home', type: 'AntDesign'},
  {name: 'About', icon: 'infocirlceo', route: 'Home', type: 'AntDesign'},
]

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Account);
