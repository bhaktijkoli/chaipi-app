import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Form, Item, Label,Content, Text, Card, Input, Textarea, Icon, Button, Toast, Container, CardItem, Body, Right } from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import { ScrollView } from 'react-native-gesture-handler';
import style from './../../../styles/style';

 
class OrderHistoryForm extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>Balaji T shop</Text>
                            <Text note>shop no.-157, Pune Station</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style = {Style.content}>Bill Details</Text>
                    <Card>
                        <CardItem>
                            <Text style = {Style.content}>Product Name</Text>
                            <Text>Item Total</Text>
                            <Right>
                                <Text>₹125</Text>
                            </Right>
                            <Text>GST</Text>
                            <Right>
                                <Text>₹15</Text>
                            </Right>
                            <Text>Delivery Charges</Text>
                            <Right>
                                <Text>₹10</Text>
                            </Right>
                            <Text note>Total</Text>
                            <Right>
                                <Text note>₹150</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
     }
}


export default OrderHistoryForm;