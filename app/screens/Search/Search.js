import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, View, Title, Text } from 'native-base';
import { Form, Item, Input, Icon } from 'native-base';

import Header from './../../components/Header'
import Footer from './../../components/Footer'

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

import ShopItem from './../../screens/Home/ShopItem';

class Home extends Component {
  state = {
    search: '',
    shops: [],
  }
  render() {
    let icon = this.state.search.length?'close':'search1'
    return(
      <Container>
        <Header title="Search"/>
        <Form>
          <Item regular style={Style.inputSearch}>
            <Input
              returnKeyType={"search"}
              onSubmitEditing={this.onSubmit}
              placeholder="Search for shops"
              value={this.state.search}
              onChangeText={search=>this.setState({search})}/>
            <Icon name={icon} type="AntDesign" onPress={e=>this.setState({search:'', shops: []})}/>
          </Item>
        </Form>
        <Content>
          <FlatList
            style={{marginLeft:5, marginRight:5, marginTop:10}}
            data={this.state.shops}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({item, index}) => {
              return <ShopItem shop={item} navigation={this.props.navigation} nulled={false}/>
            }}
            >
          </FlatList>
        </Content>
        <Footer tab='search' navigation={this.props.navigation} auth={this.props.auth}/>
      </Container>
    )
  }
  onSubmit = (e) => {
    let search = this.state.search;
    Request.get(`/shop/get?search=${search}&nearby=true`)
    .then(res => {
      this.setState({shops: res.data});
    })
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
