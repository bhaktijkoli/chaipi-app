import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Container, View, Text } from 'native-base';
import { If, Then, Else } from 'react-if';
import Shimmer from 'react-native-shimmer-placeholder';
import StepIndicator from 'react-native-step-indicator';

import Header2 from './../../components/Header2';
import SpinnerBox from './../../components/SpinnerBox';
import SpinnerModel from './../../components/SpinnerModel';

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

class OrderDetails extends Component {
  state = {
    loaded: false,
    process: false,
  }
  componentDidMount() {
    Auth.getOrder();
  }
  render() {
    let order = this.props.auth.order;
    if(!order || !order.shop) {
      return <SpinnerBox />
    }
    let products = JSON.parse(order.products);
    let shop = order.shop;
    let total = 0;
    console.log("Shop", shop);
    return(
      <Container>
        <Header2 title={"ORDER #"+order.trackid}/>
        <ScrollView style={Style.content}>
          <View style={{flexDirection: 'row'}}>
            <Shimmer autoRun={true} visible={this.state.loaded} style={CustomStyle.image}>
              <Image source={{ uri: Request.url(shop.image) }} style={CustomStyle.image} onLoad={e=>this.setState({loaded:true})}/>
            </Shimmer>
            <View>
              <Text numberOfLines={1} style={CustomStyle.title}>{shop.name}</Text>
              <Text note numberOfLines={1} style={CustomStyle.order}>ORDER #{order.trackid}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{height: 250}}>
              <StepIndicator
                customStyles={customStyles}
                direction='vertical'
                stepCount={4}
                currentPosition={order.status}
                labels={labels}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Bill Details</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 4}}>
              {
                products.map((p, key) => {
                  return(
                    <Text>{p.name} x {p.count}</Text>
                  )
                })
              }
            </View>
            <View style={{flexDirection: 'column', flex: 1, alignItems:'flex-end'}}>
                {
                  products.map((p, key) => {
                    total += p.price*p.count;
                    return(
                      <Text>&#8377;{p.price*p.count}</Text>
                    )
                  })
                }
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 4}}>
              <Text note>Item total</Text>
              <Text note>Dilevery Charges</Text>
              <Text>Total</Text>
            </View>
            <View style={{flexDirection: 'column', flex: 2, alignItems:'flex-end'}}>
              <Text note>&#8377;{total}</Text>
              <Text note>10</Text>
              <Text>&#8377;{total+10}</Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const labels = ["Order is confirmed", "Order is being prepared", "Order Picked Up", "Order Delivered"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#f39c12',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#f39c12',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#f39c12',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f39c12',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#f39c12',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#f39c12'
}

const CustomStyle = StyleSheet.create({
  image: {
    width:116,
    height:84,
    marginLeft:5,
    marginRight:5,
    marginBottom:10,
  },
  title: {
    marginTop:2,
    marginLeft:5,
    width:'100%',
    fontSize:18,
  },
  order: {
    marginTop: 0,
    marginLeft:5,
    width: '100%',
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(OrderDetails);
