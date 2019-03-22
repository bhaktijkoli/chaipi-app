import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, View, Title, Text} from 'native-base';
import { Header, Left, Body, Right, Button, Icon, Fab } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';

import ProductItem from './ProductItem';


class Products extends Component {
  state = {
    products: [],
  }
  componentDidMount() {
    Request.get('/product/get')
    .then(res => {
      console.log(res.data);
      this.setState({products: res.data})
    })
    .catch(err => console.error(err));
  }
  render() {
    let user = this.props.auth.user;
    let phone = this.props.auth.phone;
    return(
      <Container>
        <Header2 title="Your Products"/>
        <ScrollView style={Style.content}>
          {
            this.state.products.map((el, key) => {
              return <ProductItem product={el} key={key} />
            })
          }
        </ScrollView>
        <Fab
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddProduct')}>
          <Icon name="plus" type="AntDesign" />
        </Fab>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Products);
