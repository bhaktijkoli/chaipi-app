import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, DatePicker, Label, Icon} from 'native-base';
import { Form, Item, Input } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import ButtonEx from './../../components/Button';

import Request from './../../utils/request';
import Style from './../../styles/style';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import { If, Then, Else } from 'react-if';


class NotificationPermissions extends Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return(
        <Container>
        <View style={{alignItems:'center', marginTop: 40}}>
          <Image source={require('./../../assets/notification.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
        </View>
        <View style = {Style.text1}> 
        <Text>Smart Notifications</Text>
        </View>
        <View style = {Style.text2}>
        <Text>Enable notifications so you</Text>
        <Text>don't miss updates from ChaiPi.</Text>
        </View>
        <View style = {{marginTop: 30}}>
        <Button block success large onPress={this.onClickNext} >
          <Text>Enable Notifications</Text>
        </Button>
        </View>
      </Container>
    )
  }

  onClickNext() {
    this.setState({process: true});
  }
}

export default NotificationPermissions;
