import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, View, Title, Text, List} from 'native-base';
import { Button } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

import AddressItem from './AddressItem'

class Address extends Component {
  state = {
    addresses: [],
  }
  componentDidMount() {
    Request.get('/address/get')
    .then(res => {
      console.log(res.data);
      this.setState({addresses: res.data});
    })
  }
  render() {
    let { navigation } = this.props;
    return(
      <Container>
        <Header2 title="Your Addresses"/>
        <Content>
          <FlatList
            style={{width:'100%', height:500}}
            data={this.state.addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {return <AddressItem item={item} navigation={this.props.navigation}/>}}
            >
          </FlatList>
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
