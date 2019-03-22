import React, { Component } from 'react';
import { Form, Item, Label, Text, Input, Textarea, Icon, Button } from 'native-base';
import ButtonEx from './../../../components/Button';

import Style from './../../../styles/style';
import Request from './../../../utils/request';

class AddProductForm extends Component {
  state = {
    name: '',
    price: '0',
    time: '0',
    description: '',
    name_error: '',
    price_error: '',
    time_error: '',
    process: false,
  }
  render() {
    return(
      <Form>
        <Label>Name</Label>
        <Item regular error={this.state.name_error.length>0} style={Style.inputRegularError}>
          <Input
            value={this.state.name}
            onChangeText={val=>this.setState({name: val})} />
        </Item>
        <Text style={Style.error}>{this.state.name_error}</Text>
        <Label>Final Price</Label>
        <Item regular error={this.state.price_error.length>0} style={Style.inputRegularError}>
          <Input
            value={this.state.price}
            onChangeText={val=>this.setState({price: val})} />
          <Icon name='inr' type="FontAwesome" style={{color:'#575757'}}/>
        </Item>
        <Text style={Style.error}>{this.state.price_error}</Text>
        <Label>Making Time</Label>
        <Item regular error={this.state.time_error.length>0} style={Style.inputRegularError}>
          <Input
            value={this.state.time}
            onChangeText={val=>this.setState({time: val})} />
          <Icon name='clock-o' type="FontAwesome" style={{color:'#575757'}}/>
        </Item>
        <Text style={Style.error}>{this.state.time_error}</Text>
        <Label>Image</Label>
        <Button style={Style.input} bordered><Icon name="pluscircleo" type="AntDesign"/></Button>
        <Label>Description</Label>
        <Textarea
          rowSpan={5}
          bordered
          style={Style.inputNoBorder}
          value={this.state.description}
          onChangeText={val=>this.setState({description: val})} />
        <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="ADD"/>
      </Form>
    )
  }
  onClickAdd() {
    this.setState({process: true});
    Request.post('/product/add', this.state)
    .then(res => {
      if(res.data.success) {

      } else {
        let messages = res.data.messages;
        Object.keys(messages).forEach(el => {
          var key = el+'_error';
          this.setState({[key]: messages[el]})
        });
      }
    })
    .catch(res => console.log(res))
    .finally(()=>this.setState({process: false}));
  }
}


export default AddProductForm;
