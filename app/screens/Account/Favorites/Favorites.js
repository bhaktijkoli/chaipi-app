import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

import ShopItem from './../../../screens/Home/ShopItem';

class Favorites extends Component {
  render() {
    let favorites = this.props.auth.favorites
    return(
      <Container>
        <Header2 title="Your Favorites"/>
        <Content style={Style.content}>
          <FlatList
            style={{marginLeft:5, marginRight:5}}
            data={favorites}
            renderItem={({item, index}) => { return <ShopItem shop={item.shop} navigation={this.props.navigation} nulled={false}/> }}
              keyExtractor={(item, index) => index.toString()}
              >
            </FlatList>
          </Content>
        </Container>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  export default connect(mapStateToProps)(Favorites);
