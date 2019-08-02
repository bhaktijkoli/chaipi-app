import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, View, Title, Text, List} from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

class Profile extends Component {
  state = {
  }
  render() {
    return(
      <Container>
        <Header2 title="Your Profile"/>
        <ScrollView>
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

export default connect(mapStateToProps)(Profile);
