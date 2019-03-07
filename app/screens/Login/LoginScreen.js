import React, { Component } from 'react';
import { Container, Content, Title} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';

import Style from './../../styles/default';

class LoginScreen extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content>
          <Form>
            <Item floatingLabel style={Style.input}>
              <Label>Phone</Label>
              <Input keyboardType="phone-pad"/>
            </Item>
            <Button block style={Style.button}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen;
