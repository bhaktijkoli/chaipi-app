import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { View , Content, Text, Card,  Container, CardItem, Body, Right } from 'native-base';

import { Col, Row, Grid } from "react-native-easy-grid";
import { List, ListItem } from 'native-base';

import Shimmer from 'react-native-shimmer-placeholder';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import style from './../../../styles/style';

 
class OrderHistoryForm extends Component {
    state = {
        loaded: false,
      }
    render() {
        //let cart = this.props.cart;
        //let product = cart.product
        //console.log("URL", product.image);
        return (
            <Container>
                <Content>
                    <FlatList>
                    <Card>
                    {/*    <CardItem>
                        <View style = {{flexDirection: 'row'}}>
                            <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
                            <Image source={{ uri: Request.url(product.image) }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
                            </Shimmer>
                        </View>
                        <Grid style = {CustomStyle.descContainer}>
                            <Row>
                                <Text numberOfLines={1} style={CustomStyle.title}>{product.name}</Text>
                            </Row>
                        </Grid>
                    </CardItem>*/}
                    <View
                    style = {{
                        borderBottomColor: 'gainsboro',
                        borderBottomWidth: 1,
                    }}
                    ></View>
                        <CardItem> 
                        <Grid style={CustomStyle.billContainer}>
                            <Row>
                                <Text style = {Style.heading}>Bill Details</Text>
                            </Row>
                            <Row style = {{paddingTop: 5, paddingBottom: 5}}>
                                <Col>
                                <Text style = {CustomStyle.billItem}>Item Total</Text>
                                </Col>
                                <Col>
                                <Text style = {CustomStyle.billCost}>&#8377;</Text>
                                </Col>
                            </Row>
                            <Row style = {[ Style.upperBorder,{paddingTop: 5, paddingBottom: 5}]}>
                                <Col>
                                <Text style = {CustomStyle.billItem}>Delivery Fee</Text>
                                </Col>
                                <Col>
                                <Text style = {CustomStyle.billCost}>&#8377;10</Text>
                                </Col>
                            </Row>
                            <Row style = { [Style.upperBorder, {paddingTop: 5, paddingBottom: 5}]}>
                                <Col>
                                <Text style = {CustomStyle.billItem}>To Pay</Text>
                                </Col>
                                <Col>
                                <Text style = {CustomStyle.billCost}>&#8377;</Text>
                                </Col>
                            </Row>
                        </Grid>
                        </CardItem>
                    </Card>
                    </FlatList>
                </Content>
            </Container>
        )
     }
}


const CustomStyle = StyleSheet.create({
    billContainer: {
        padding: 10,
      },
      billItem: {
    
      },
      billCost: {
        fontWeight: '500',
        alignSelf: 'flex-end',
      },
      image: {
        width:116,
        height:84,
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
      },
      descContainer: {
        marginRight: 10,
      },
      title: {
        marginTop:5,
        marginRight:5,
        marginBottom:2,
        marginLeft:5,
        width:'100%',
        height:20,
      },
})


export default OrderHistoryForm;