import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { Container, Content, View, Text, Button, DatePicker, Label, Icon} from 'native-base';
import { Form, Item, Input } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import ButtonEx from './../../components/Button';
import NotificationPermissions from '../Permissions/NotificationPermissions';

import Request from './../../utils/request';
import Style from './../../styles/style';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import { If, Then, Else } from 'react-if';

export async function request_location_runtime_permission() {

    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location Permissions',
                'message': 'ChaiPi app needs access to your location'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
            Alert.alert("Location Permission Granted");
        }
        else{
            Alert.alert("Location Permission Not Granted");
        }
    }
    catch(err) {
        console.warn(err)
    }
}

class LocationPermissions extends Component {
  static navigationOptions = {
    header: null,
  }

  async componentDidMount(){
      await request_location_runtime_permission()
  }
  render() {
    return(
        <Container>
        <View style={{alignItems:'center', marginTop: 40}}>
          <Image source={require('./../../assets/loaction.png')} style={{width:264, height:264, marginLeft:-15,marginBottom:20}}/>
        </View>
        <View style = {Style.text1}> 
        <Text>Loaction Services</Text>
        </View>
        <View style = {Style.text2}>
        <Text>We need to konw where you are</Text>
        <Text>in order to scan nearby assiatants.</Text>
        </View>
        <View style = {{marginTop: 30}}>
        <Button block success large onPress={this.onClickNext} >
          <Text>Enable Location Services</Text>
        </Button>
        </View>
      </Container>
    )
  }

  onClickNext () {
    this.props.navigation.navigate("NotificationPermissions");
  }
}

export default LocationPermissions;
