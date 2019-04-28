import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'native-base';

import Style from './../../../styles/style';
import Header2 from './../../../components/Header2';
import Auth from './../../../actions/authActions';

import AddAddressForm from './AddAddressForm';

class AddAddress extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header2 title="Add New Address"/>
        <AddAddressForm navigation={this.props.navigation} update={this.update.bind(this)}/>
      </Container>
    )
  }
  update() {
    Auth.getAddress(this)
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AddAddress);
