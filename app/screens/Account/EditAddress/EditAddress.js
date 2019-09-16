import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'native-base';

import Style from './../../../styles/style';
import Header2 from './../../../components/Header2';
import Auth from './../../../actions/authActions';

import EditAddressForm from './EditAddressForm';

class EditAddress extends Component {
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header2 title="Edit Address"/>
        <EditAddressForm navigation={this.props.navigation} update={this.update.bind(this)}/>
      </Container>
    )
  }
  update() {
    Auth.getAddress()
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(EditAddress);
