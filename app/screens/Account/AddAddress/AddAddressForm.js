import React, { Component } from 'react';
import { Content, Form, Item, Label, Text, Input, Textarea, Picker, Icon, Button, Toast } from 'native-base';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import ButtonEx from './../../../components/Button';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { If } from 'react-if';

import Style from './../../../styles/style';
import Request from './../../../utils/request';

class AddAddressForm extends Component {
  state = {
    address: '',
    house: '',
    landmark: '',
    house_error: '',
    landmark_error: '',
    type_error: '',
    lat: 0,
    lon: 0,
    type: 'home',
    type_other: '',
    process: false,
  }
  async componentDidMount() {
    if(await !this.requestLocationPermission()) return;
    Geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.moveCamera(lat, lon)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    let coordinate = {
      latitude: this.state.lat,
      longitude: this.state.lon,
    }
    return(
      <Content>
        <MapView
          ref="map"
          onRegionChange={this.onRegionChange.bind(this)}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          style={CustomStyle.map}>
          <Marker
            title="Move pin to adjust your location"
            coordinate={coordinate}
            >
          </Marker>
        </MapView>
        <Form style={Style.content}>
          <Label>Location</Label>
          <Text style={Style.inputRegularError} numberOfLines={2}>
            {this.state.address==''?'Searching your location':this.state.address}
          </Text>
          <Text style={Style.error}></Text>
          <Label>House/Flat No</Label>
          <Item regular error={this.state.house_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.house}
              onChangeText={val=>this.setState({house: val})} />
          </Item>
          <Text style={Style.error}>{this.state.house_error}</Text>
          <Label>Landmark</Label>
          <Item regular error={this.state.landmark_error.length>0} style={Style.inputRegularError}>
            <Input
              value={this.state.landmark}
              onChangeText={val=>this.setState({landmark: val})} />
          </Item>
          <Text style={Style.error}>{this.state.landmark_error}</Text>
          <Label>Save As</Label>
          <Item regular style={Style.inputRegularError}>
            <Picker
              mode="dropdown"
              iosHeader="Save As"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.type}
              onValueChange={type => this.setState({type})}
              >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </Item>
          <If condition={this.state.type == "other"}>
            <Item regular error={this.state.type_error.length>0} style={Style.inputRegularError}>
              <Input
                value={this.state.type_other}
                onChangeText={val=>this.setState({type_other: val})} />
            </Item>
          </If>
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="SAVE"/>

        </Form>
      </Content>
    )
  }
  onClickAdd() {
    this.setState({process: true, house_error: '', landmark_error: ''})
    Request.post('/address/add', this.state)
    .then(res => {
      if(res.data.success) {
        this.props.update();
        if(this.props.navigation.getParam('cart')) {
          this.props.navigation.navigate('Cart');
        } else {
          Toast.show({text: `Address has been added.`, buttonText: 'Ok'});
          this.props.navigation.navigate('Home');
        }
      } else {
        let messages = res.data.messages;
        Object.keys(messages).forEach(el => {
          var key = el+'_error';
          this.setState({[key]: messages[el]})
        });
      }    })
      .catch(err => console.error(err))
      .finally(() => this.setState({process: false}))
    }
    onRegionChange(region) {
      this.setState({address: ""})
      this.moveMarker(region.latitude, region.longitude);
    }
    onRegionChangeComplete(region) {
      this.getLocation();
    }
    moveCamera(lat, lon) {
      this.moveMarker(lat, lon)
      this.refs.map.animateCamera({
        center: {
          latitude: this.state.lat,
          longitude: this.state.lon,
        },
        pitch: 0,
        heading: 0,
        altitude: 18,
        zoom: 18,
      })
      this.getLocation();
    }
    moveMarker(lat, lon) {
      this.setState({lat, lon});
    }
    getLocation() {
      let {lat, lon} = this.state;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU`;
      axios.get(url)
      .then(res => {
        console.log(res.data);
        let address = res.data.results[1].formatted_address;
        this.setState({address});
      })
    }
    async requestLocationPermission() {
      if(Platform.OS === 'iOS') return true;
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true
        } else {
          console.log('Camera permission denied');
          return false
        }
      } catch (err) {
        console.warn(err);
        return true;
      }
    }
  }

  const CustomStyle = StyleSheet.create({
    map: {
      width:'100%',
      height:260,
    },
  })

  export default AddAddressForm;
