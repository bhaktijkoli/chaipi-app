import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title} from 'native-base';
import { Button, Text } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Request from './../../utils/request';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Style from './../../styles/style';

class Login extends Component {
  constructor(props) {
    super(props)
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      phone: '8104929969',
      user: null,
      loading: true,
    }
  }
  componentDidMount() {
    let user = null
    this.authChange = firebase.auth().onAuthStateChanged((u) => {
      if(user) return;
      user = u;
      if(user) {
        AuthActions.setUserUID(this, user._user.uid);
        Request.get('/user/get/'+user._user.uid)
        .then(res => {
          AuthActions.setUser(this, res.data);
          this.props.navigation.dispatch(NavigationActions.homeAction);
        })
        .catch(err => {
          this.props.navigation.dispatch(NavigationActions.SetupAction);
        })
      } else {
        this.setState({loading:false})
      }
    });
  }
  componentWillUnmount() {
    this.authChange = null;
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
