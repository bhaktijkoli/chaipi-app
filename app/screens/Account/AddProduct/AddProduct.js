import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';

import Style from './../../../styles/style';
import Header2 from './../../../components/Header2';

import AddProductForm from './AddProductForm';

class AddProduct extends Component {
  componentDidMount() {
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    return(
      <Container>
        <Header2 title="Add A Product"/>
        <ScrollView style={Style.content}>
          <AddProductForm auth={this.props.auth} navigation={this.props.navigation}/>
        </ScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AddProduct);
