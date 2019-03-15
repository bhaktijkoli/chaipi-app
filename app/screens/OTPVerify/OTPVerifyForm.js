import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';
import { Form, Item, Label, Input } from 'native-base';
import firebase from 'react-native-firebase';

import Style from './../../styles/style';

class OTPVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    }
    this.OnClickVerify = this.OnClickVerify.bind(this);
  }
  render() {
    var counts = [0,1,2,3,4,5];
    var countsList =   counts.map((el, key) => {
      return(
        <View key={key} style={{flex:1,margin:3}}>
          <Item style={Style.input}>
            <Input
              ref={input => this['code'+key] = input}
              textAlign={'center'}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={key==0}
              value={this.state.code}
              onChangeText={value=> {
                this.setState({['code'+key]:value})
                if(value.length == 1 && key < counts.length-1) {
                  this['code'+(key+1)]._root.focus();
                }
              }}
              />
          </Item>
        </View>
      )
    });
    return(

      <Form>
        <View style={{'alignItems':'center'}}>
          <Label>Enter the verification code sent to</Label>
          <Text style={{marginTop:10, marginBottom:10}}>{this.props.phone}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          {countsList}
        </View>
        <Button large block style={Style.button} onPress={this.OnClickVerify}>
          <Text>VERIFY</Text>
        </Button>
      </Form>
    )
  }
  OnClickVerify() {
    let { code0, code1, code2, code3, code4, code5 } = this.state;
    let code = code0 + code1 + code2 + code3 + code4 + code5;
    this.props.confirmResult.confirm(code)
    .then(user=> {
      console.log(user);
    })
    .catch(err => console.error(err));
  }
}

export default OTPVerify;
