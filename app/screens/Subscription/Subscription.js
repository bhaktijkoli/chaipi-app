import React, { Component } from 'react';
import { connect } from "react-redux";
import { Image } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import { Form, Item, Label, Picker } from 'native-base';
import { H2, Text, Icon } from 'native-base';
import ButtonEx from './../../components/Button'

import Header2 from './../../components/Header2';
import Request from './../../utils/request';
import Style from './../../styles/style';

class Subscription extends Component {
  state = {
    duration: 3,
    process: false,
  }
  render() {
    let durations = [3,5,7,10,15,30]
    let subscription = this.props.navigation.getParam('subscription');
    return(
      <Container>
        <Header2 title={subscription.name}/>
        <Content style={Style.content}>
          <H2 style={Style.bottom}>{subscription.name}</H2>
          <Image source={{uri: subscription.image}} style={{width:256, height: 216}}/>
          <Text style={Style.mg10}>{subscription.description}</Text>
          <Form style={Style.mg10}>
            <Label style={Style.lightColor}>Days</Label>
            <Item picker style={{width:200}}>
              <Picker
                mode="dropdown"
                style={{width:200}}
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={this.state.duration}
                onValueChange={(duration) => this.setState({duration})}
                >
                {
                  durations.map((el, key) => {
                    return(
                      <Picker.Item label={el} value={el} key={key}/>
                    )
                  })
                }
              </Picker>
            </Item>
            <ButtonEx loading={this.state.process} text="ADD TO CART" onPress={this.onAddToCart.bind(this)}/>
          </Form>
        </Content>
      </Container>
    )
  }
  onAddToCart() {
    let subscription = this.props.navigation.getParam('subscription');
    let data = {
      product: subscription.id,
      count: this.state.duration,
    }
    Request.post('/order/add', data)
    .then(res => {
      if(res.data.success) {
        Toast.show({text: `${subscription.name} has been added to cart.`, buttonText: 'Ok'});
        this.props.navigation.navigate('Home');
      }
    })
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Subscription);
