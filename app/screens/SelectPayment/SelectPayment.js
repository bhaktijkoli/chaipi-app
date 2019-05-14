import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, List, Separator, ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import { If } from 'react-if';

import Header2 from './../../components/Header2';
import SpinnerModel from './../../components/SpinnerModel';

import Auth from './../../actions/authActions';
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
                <Text note>Please keep exact change handy to help us servce you better</Text>
              </Body>
            </ListItem>
            <Separator bordered>
              <Text>CREDIT/DEBIT CARDS</Text>
            </Separator>
          </List>
        </Content>
        <SpinnerModel visible={this.state.process}/>
      </Container>
    )
  }
  onProceed(payment) {
    this.setState({process: true})
    Request.post('/cart/proceed', {payment})
    .then(res => {
      this.setState({process: false})
      Auth.setOrder(res.data, this)
    }).catch(err => console.log(err));
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SelectPayment);
