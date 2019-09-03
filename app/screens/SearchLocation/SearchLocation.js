import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Text } from 'native-base';

import Header from './../../components/Header2'

import Auth from './../../actions/authActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

class SearchLocation extends Component {
  render() {
    let items = [];
    console.log(this.props.auth);
    return(
      <Container>
        <Header title={`Set your Location`}/>
          <Content>
            <FlatList
              style={{marginLeft:5, marginRight:5}}
              data={items}
              renderItem={({item, index}) => { return <ShopItem shop={item} navigation={this.props.navigation} nulled={this.state.loading}/> }}
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

export default connect(mapStateToProps)(SearchLocation);
