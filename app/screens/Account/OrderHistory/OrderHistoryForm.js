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
                            <View>
                            <Text style = {Style.top}>Item Total</Text>
                            <Text style = {{alignItems: 'flex-end', marginTop : 20}}>125</Text>
                            </View>
                            <View>
                            <Text style = {Style.top}>GST</Text>
                            <Text style = {{alignItems: 'flex-end', marginTop : 20, marginLeft: 10, marginRight: 10}}>50</Text>
                            </View>
                            <View>
                            <Text style = {Style.top}>Delivery Charges</Text>
                            <Text style = {{alignItems: 'flex-end', marginTop : 20}}>10</Text>
                            </View>
                            <View>
                            <Text note style = {Style.top}>Total</Text>
                            <Text style = {{alignItems: 'flex-end', marginTop : 20}}>10</Text>
                            </View>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
     }
}


export default OrderHistoryForm;