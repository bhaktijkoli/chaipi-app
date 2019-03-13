import React, { Component } from 'react';
import { Container, Content, Title, View} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Style from './../../styles/style';

class OTPVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      code: '',
      confirmResult: null,
    }
    this.OnClickVerify = this.OnClickVerify.bind(this);
  }
  componentDidMount() {
    let phone = this.props.navigation.getParam('phone');
    this.setState({phone});
    firebase.auth().signInWithPhoneNumber(phone, true)
    .then(confirmResult => {
      this.setState({confirmResult: confirmResult});
    })
    .catch(err => console.error(err)) }
    render() {
      let phone = this.props.navigation.getParam('phone');
      return(
        <Container>
          <Content>
            <Form>
              <View style={Style.label}>
                <Label>Enter the verification code sent to</Label>
                <Text>{phone}</Text>
              </View>
              <Item style={Style.input}>
                <Input keyboardType="numeric" value={this.state.code} onChangeText={value=>this.setState({'code':value})}/>
              </Item>
              <Button block style={Style.button} onPress={this.OnClickVerify}>
                <Text>Verify</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      )
    }
    OnClickVerify() {
      this.state.confirmResult.confirm(this.state.code)
      .then(user=> {
        console.log(user);
      })
      .catch(err => console.error(err));
    }
  }

  export default OTPVerify;
