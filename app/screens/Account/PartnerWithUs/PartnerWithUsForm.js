import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { If } from 'react-if';
import ButtonEx from './../../../components/Button';

import Style from './../../../styles/style';
import Request from './../../../utils/request';

class AddProductForm extends Component {
  state = {
    name: '',
    address: '',
    contact: '',
    name_error: '',
    address_error: '',
    contact_error: '',
    loading: true,
    partner: null,
    process: false,
  }
  componentDidMount() {
    Request.get('/partner/get')
    .then(res => {
      this.setState({partner: res.data, loading: false});
    })
    this.setState({contact: this.props.auth.phone});
  }
  render() {
    if(this.state.loading) return <View></View>
    if(this.state.partner) {
      return(
        <View>
          <Text style={{textAlign: 'center'}}>
            We have recived your request, we will contact you soon.
          </Text>
        </View>
      )
    }
    return(
      <Form style={Style.bottom}>
        <Label>Shop Name</Label>
        <Item regular error={this.state.name_error.length>0} style={Style.inputRegularError}>
          <Input
            value={this.state.name}
            onChangeText={val=>this.setState({name: val})} />
        </Item>
        <Text style={Style.error}>{this.state.name_error}</Text>
        <Label>Contact No:</Label>
        <Item regular error={this.state.contact_error.length>0} style={Style.inputRegularError}>
          <Input
            value={this.state.contact}
            onChangeText={val=>this.setState({contact: val})} />
        </Item>
        <Text style={Style.error}>{this.state.contact_error}</Text>
        <Label>Address</Label>
        <Textarea
          rowSpan={5}
          bordered
          style={Style.inputNoBorder}
          value={this.state.address}
          onChangeText={val=>this.setState({address: val})} />
        <Text style={Style.error}>{this.state.address_error}</Text>
        <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="SUBMIT"/>
      </Form>
    )
  }
  onClickAdd() {
    this.setState({process: true, name_error: '', address_error: '', contact_error: ''});
    let data = {
      name: this.state.name,
      contact: this.state.contact,
      address: this.state.address,
    }
    Request.post('/partner/add', data)
    .then(res => {
      console.log(res.data);
      if(res.data.success) {
        Toast.show({text: `We have recived your form, will contact you back soon.`, buttonText: 'Ok'});
        this.props.navigation.navigate('Home');
      } else {
        let messages = res.data.messages;
        Object.keys(messages).forEach(el => {
          var key = el+'_error';
          this.setState({[key]: messages[el]})
        });
      }
    })
    .catch(res => console.err(res))
    .finally(()=>this.setState({process: false}));
  }
}


export default AddProductForm;
