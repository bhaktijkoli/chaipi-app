import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from "react-native";
import { Container, Content, List, Separator, ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import { If } from 'react-if';

import Header2 from './../../components/Header2';
import SpinnerModel from './../../components/SpinnerModel';

import Auth from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

class SelectPayment extends Component {
  state = {
    process: false,
  }
  render() {
    return(
      <Container>
        <Header2 title="Payment Options"/>
        <Content>
          <List>
            <Separator bordered>
              <Text>PAY ON DELIVERY</Text>
            </Separator>
            <ListItem avatar onPress={e => this.onProceed(0)}>
              <Left>
                <Icon name="money" type="FontAwesome" style={{width:30, color: '#87D37C'}}/>
              </Left>
              <Body>
                <Text>Cash</Text>
                <Text note>Please keep exact change handy to help us serve you better</Text>
              </Body>
            </ListItem>
            {/*<Separator bordered>
              <Text>CREDIT/DEBIT CARDS</Text>
            </Separator>
            <ListItem>
              <Left>
                <Icon name="credit-card" type='FontAwesome' style={{width:30, color: '#a9a9a9'}}/>
              </Left>
              <Body>
                <Text>Credit or Debit Card</Text>
              </Body>
            </ListItem>*/}
          </List>
        </Content>
        <SpinnerModel visible={this.state.process}/>
      </Container>
    )
  }
  onProceed(payment) {
    this.setState({process: true})
    let addressData = this.props.navigation.getParam('address');
    let {lat, lon, house, landmark, address} = addressData;
    Request.post('/cart/proceed', {payment, house, landmark, lat, lon, address})
    .then(res => {
      console.log("Order", res.data);
      if(res.data.status == 1) {
        this.setState({process: false})
        Auth.setOrder(res.data);
        NavigationActions.resetNavigation(this, 'OrderDetails');
      } else {
        Alert.alert("Order",
        res.data.message,
        [
          {text: 'OK', onPress: () => NavigationActions.resetNavigation(this, 'Cart')},
        ],
        {cancelable: false});
      }
    }).catch(err => console.log(err));
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SelectPayment);
