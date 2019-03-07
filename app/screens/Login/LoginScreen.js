import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Content, View, Title} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Style from './../../styles/default';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      phone: '8104929969',
      loading: true,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.props.navigation.dispatch(resetAction);
        this.setState({loading:false})
      } else {
        this.setState({loading:false})
      }
    });
  }
  render() {
    if(this.state.loading) {
      return(
        <View></View>
      )
    }
    return(
      <Container>
        <Content>
          <Form>
            <Item floatingLabel style={Style.input}>
              <Label>Enter your phone number</Label>
              <Input
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                maxLength={10}
                value={this.state.phone}
                onChangeText={value=>this.setState({'phone':value})}/>
            </Item>
            <Button block style={Style.button} onPress={this.onClickLogin}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
  onClickLogin() {
    var phone = "+91"+this.state.phone;
    this.props.navigation.navigate('OTPVerify', {phone});
  }
}

export default LoginScreen;
