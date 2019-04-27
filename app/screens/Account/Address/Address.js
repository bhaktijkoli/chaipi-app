import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, View, Title, Text, List} from 'native-base';
import { Button } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

import AddressItem from './AddressItem';

class Shop extends Component {
  state = {
    addresses: [],
  }
  componentDidMount() {
    this.update()
  }
  render() {
    let { navigation } = this.props;
    return(
      <Container>
        <Header2 title="Addresses"/>
        <Content>
          <FlatList
            data={this.state.addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {return <AddressItem item={item} navigation={navigation} update={this.update.bind(this)}/>}}
              >
            </FlatList>
            <Button primary block style={Style.mg10} onPress={e=>navigation.navigate('AddAddress')}>
              <Text>ADD ADDRESS</Text>
            </Button>
          </Content>
        </Container>
      )
    }
    update() {
      Request.get('/address/get')
      .then(res => {
        this.setState({addresses: res.data});
      })
      .catch(err => console.error(err))
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  export default connect(mapStateToProps)(Shop);
