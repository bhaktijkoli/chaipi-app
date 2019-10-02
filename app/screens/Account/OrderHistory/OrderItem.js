import React, { Component } from 'react';
import { Card, CardItem, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';

import Request from './../../../utils/request';

class OrderItem extends Component {
  render() {
    let order = this.props.item.item;
    let {shop, products, price} = order;
    products = JSON.parse(products);
    let createdAt = moment(order.createdAt, 'YYYY-MM-DD HH:mm:ss');
    return(
      <Card>
        <CardItem header>
          <Col>
            <Text>{shop.name}</Text>
            <Text note numberOfLines={3} style={{fontSize:12}}>{shop.address}</Text>
            <Text note style={{fontSize:15, paddingTop:10}}>&#8377;{price}</Text>
          </Col>
        </CardItem>
        <CardItem>
          <Col>
            <Text>{products.map((el, key) => { return `${el.name}x${el.count}${key!=products.length-1?", ":""}`})}</Text>
            <Text note style={{fontSize:10}}>{createdAt.format('MMMM Do, h:m A')}</Text>
            {/*<Button primary bordered style={{marginTop: 10}}>
              <Text>REORDER</Text>
    </Button>*/}
          </Col>
        </CardItem>
      </Card>
    )
  }
}

export default OrderItem;
