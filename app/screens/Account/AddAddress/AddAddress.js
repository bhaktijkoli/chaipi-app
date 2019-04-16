import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content } from 'native-base';

import Style from './../../../styles/style';
import Header2 from './../../../components/Header2';

import AddAddressForm from './AddAddressForm';

class AddAddress extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header2 title="Add New Address"/>
        <Content style={Style.content}>
          <AddAddressForm />
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

export default connect(mapStateToProps)(AddAddress);
