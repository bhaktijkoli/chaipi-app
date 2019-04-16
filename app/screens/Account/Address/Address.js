import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, View, Title, Text, List} from 'native-base';
import { Button } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

class Address extends Component {
  state = {
    addresses: [],
  }
  componentDidMount() {
  }
  render() {
    let { navigation } = this.props;
    return(
      <Container>
        <Header2 title="Your Addresses"/>
        <Content>
          <Button primary block style={Style.mg10} onPress={e=>navigation.navigate('AddAddress')}>
            <Text>ADD ADDRESS</Text>
          </Button>
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

export default connect(mapStateToProps)(Address);
