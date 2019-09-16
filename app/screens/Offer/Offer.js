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

class Offer extends Component {
  state = {
    duration: 3,
    process: false,
  }
  render() {
    return(
      <Container>
        <Header2 title={offer.name}/>
        <Content style={Style.content}>
          <H2 style={Style.bottom}>{offer.name}</H2>
          <Image source={{uri: offer.image}} style={{width:256, height: 216}}/>
          <Text style={Style.mg10}>{offer.description}</Text>
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

export default connect(mapStateToProps)(Offer);
