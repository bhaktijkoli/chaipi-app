import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { Image } from 'react-native';
import { List, ListItem } from 'native-base';
import { If } from 'react-if'

import Footer from './../../components/Footer'

import Style from './../../styles/style';
import Request from './../../utils/request';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

class Sidebar extends Component {
  componentDidMount() {
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    let image = this.props.auth.user.image;
    return(
      <Container>
        <Content>
          <ScrollView>
            <View style={{marginTop:50, marginBottom: 10,}}>
              <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20}}>
                <Image source={{uri: Request.url(image)}} style={Style.avatar}/>
              </View>
              <Text style={{marginLeft:15,color:'#000'}}>{user.fullname.toUpperCase()}</Text>
              <Text style={{marginLeft:15,color:'#000'}}>{phone}</Text>
            </View>
            <List>
              <ListItem itemDivider>
                <Text>My Account</Text>
              </ListItem>
              {this.renderSettingItems(accountItems)}
              <ListItem itemDivider>
                <Text>Help</Text>
              </ListItem>
              {this.renderSettingItems(helpItems)}
            </List>
          </ScrollView>
        </Content>
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
  {name: 'Profile', icon: 'user', route: 'Profile', type: 'AntDesign'},
  {name: 'Address', icon: 'enviromento', route: 'Address', type: 'AntDesign'},
  {name: 'Payment', icon: 'creditcard', route: 'Cards', type: 'AntDesign'},
  {name: 'Favorites', icon: 'hearto', route: 'Favorites', type: 'AntDesign'},
  {name: 'Order History', icon: 'clockcircleo', route: 'OrderHistory', type: 'AntDesign'},
  // {name: 'App Settings', icon: 'setting', route: 'Home', type: 'AntDesign'},
  {name: 'Logout', icon: 'logout', route: 'Logout', type: 'AntDesign'},
];

const helpItems = [
  {name: 'Partner with us?', icon: 'book', route: 'PartnerWithUs', type: 'AntDesign'},
  {name: 'About', icon: 'infocirlceo', route: 'About', type: 'AntDesign'},
  {name: 'Help', icon: 'questioncircleo', route: 'Help', type: 'AntDesign'},
]

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Sidebar);
