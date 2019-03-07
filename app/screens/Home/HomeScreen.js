import React, { Component } from 'react';
import { Container, Content, View, Title} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Style from './../../styles/default';

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content>
          <Title>Welcome Home!</Title>
        </Content>
      </Container>
    )
  }
}

export default HomeScreen;
