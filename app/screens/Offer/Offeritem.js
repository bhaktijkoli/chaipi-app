import React, { Component } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { View, Text, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import Shimmer from 'react-native-shimmer-placeholder';

import Style from './../../styles/style';
import Request from './../../utils/request';


class CartItem extends Component {
  state = {
    loaded: false,
  }
  render() {
    let offer = this.props.offer;
    let uri = offer.image;
    let shop = this.props.shop;
    let product  = this.props.product;
    return(
    <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text numberOfLines={1} style={CustomStyle.title}>{offer.name}</Text>
                  <Text note>{offer.note}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri }} style={CustomStyle.image}/>
            </CardItem>
            <CardItem>
              <Left>
                  <Text>{shop.name}</Text>
              </Left>
              <Body>
                  <Text>{product.name}</Text>
              </Body>
              <Right>
                <Text></Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>

      /*<View style={{flexDirection: 'row'}}>
        <Grid style={CustomStyle.descContainer}>
          <Row>
            <Text numberOfLines={1} style={CustomStyle.title}>{offer.name}</Text>
          </Row>
        </Grid>
        <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
          <Image source={{ uri}} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
        </Shimmer>
        <View style={{flexDirection: 'column'}}>
        </View>
    </View>*/
    )
  }

}

const CustomStyle = StyleSheet.create({
  image: {
    //width:116,
    //height:84,
    //marginLeft:5,
    //marginRight:5,
    //marginBottom:10,
    height: 200,
    width: null,
    flex: 1,
  },
  title: {
    marginTop:5,
    marginRight:5,
    marginBottom:2,
    marginLeft:5,
    width:'100%',
    height:20,
  },
  note: {
    marginRight:5,
    marginBottom:5,
    marginLeft:5,
    width:'100%',
    height: 17,
  },
  descContainer: {
    marginRight: 10,
  }
})

export default CartItem;
