import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Button from './../../components/Button';

import Style from './../../styles/style';

class OTPVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      process: false,
    }
  }
  render() {
    return(
      <Form>
        <View style={{alignItems:'center', marginBottom: 20}}>
          <Label>Enter the verification code sent to</Label>
          <Text style={{marginTop:10, marginBottom:10}}>{this.props.phone}</Text>
        </View>
        <Item floatingLabel style={Style.input}>
          <Input
            textAlign={'center'}
            keyboardType="numeric"
            maxLength={6}
            autoFocus
            value={this.state.code}
            onChangeText={code=> this.setState({code})}
            />
        </Item>
        <Button onPress={this.OnClickVerify} loading={this.state.process} text="VERIFY"/>
      </Form>
    )
  }
  OnClickVerify = () => {
    let { code } = this.state;
    this.setState({process:true})
    this.props.confirmResult.confirm(code)
    .then(user=> {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
      Toast.show({ text: err.message, buttonText: 'Ok' })
    })
    .finally(() => {
      this.setState({process:false})
    })
  }
}

export default OTPVerify;
