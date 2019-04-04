import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title, Button, Text, H1} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

import Header2 from './../../components/Header2';

import Auth from './../../actions/authActions';
import Style from './../../styles/style';
import Request from './../../utils/request';

class Shop extends Component {
  state = {
    products: [],
  }
  componentDidMount() {
    let shop = this.props.navigation.getParam('shop');
    Request.get('/product/get?shop='+shop.id)
    .then(res => {
      console.log(res.data);
      setTimeout(function () {
        this.setState({products: res.data});
      }.bind(this), 500);
    })
    .catch(err => console.error(err))
  }
  render() {
    let shop = this.props.navigation.getParam('shop');
    return(
      <Container>
        <Header2 title={shop.name}/>
        <Content style={{padding:5}}>
          <FlatList
            numColumns={2}
            data={this.state.products}
            renderItem={({item, index}) => { return this.renderProductItem(item, index) }}
            keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </Content>
      </Container>
    )
  }
  renderProductItem(item, key) {
    return(
      <TouchableOpacity key={item.id} style={{margin:10}}>
        <Image source={{uri: item.image}} style={{height:124, width:this.getItemWidth()}}/>
        <Text style={{fontSize:16, marginTop:5}}>{item.name}</Text>
        <Grid style={{marginTop:5}}>
          <Col>
            <Button bordered small>
              <Text>Add</Text>
            </Button>
          </Col>
          <Col>
            <Text style={[{fontSize:14, alignSelf: 'flex-end'}, Style.lightColor]}>&#8377;{item.price}</Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    )
  }
  getItemWidth() {
    let {width} = Dimensions.get('window');
    return width/2-25;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}



// <View style={{flex: 1, flexDirection:'row', alignContent: 'flex-end', width: '100%'}}>
//   <Text style={[{fontSize:14, marginTop:5}, Style.lightColor]}>&#8377;{item.price}</Text>
//   <View>
//     <Button bordered>
//       <Text>Add</Text>
//     </Button>
//   </View>
// </View>


export default connect(mapStateToProps)(Shop);
