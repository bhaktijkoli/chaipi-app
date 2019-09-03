import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'native-base';

import Style from './../../styles/style';
import Header2 from './../../components/Header2';
import Auth from './../../actions/authActions';

import SearchLocationAddressForm from './SearchLocationAddressForm';

class SearchLocationAddress extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Add New Address"/>
        <SearchLocationAddressForm navigation={this.props.navigation}/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SearchLocationAddress);
