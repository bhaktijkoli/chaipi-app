import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, } from 'native-base';
import firebase from 'react-native-firebase';

import Footer from './../../components/Footer'

import Style from './../../styles/style';

class Account extends Component {
  componentDidMount() {
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    console.log(user);
    return(
      <Container>
        <Header transparent>
          <Left>
            <View>
              <Title>{user.fullname.toUpperCase()}</Title>
              <Text>{phone}</Text>
            </View>
          </Left>
        </Header>
        <Content style={Style.content}>
          <Text>Welcome Account!</Text>
        </Content>
        <Footer tab='account' navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Account);
