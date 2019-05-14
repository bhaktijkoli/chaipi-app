import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';
import { If } from 'react-if';

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

class Checkout extends Component {
  render() {
    return(
      <Container>
        <Content style={{marginTop:50, textAlign: 'center'}}>
          <Text>Wating for server</Text>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Checkout);
