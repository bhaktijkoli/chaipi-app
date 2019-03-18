import React, { Component } from 'react';
import { Container, Content, View, Title, Text} from 'native-base';
import { Header } from 'native-base';
import firebase from 'react-native-firebase';

import Footer from './../../components/Footer'

import Style from './../../styles/style';

class Home extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header transparent>
        </Header>
        <Content style={Style.content}>
          <Text>Welcome Home!</Text>
        </Content>
        <Footer tab='home'/>
      </Container>
    )
  }
}

export default Home;
