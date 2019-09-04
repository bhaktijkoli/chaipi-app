import React, { Component } from 'react';
import { Content, Form, Item, Label, Text, Input, Textarea, Picker, Icon, Button, Toast } from 'native-base';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import ButtonEx from './../../components/Button';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { If } from 'react-if';

import Style from './../../styles/style';
import Request from './../../utils/request';

class SearchLocationAddressForm extends Component {
  state = {
    address: '',
    house: '',
    landmark: '',
    house_error: '',
    landmark_error: '',
    type_error: '',
    lat: 0,
    lon: 0,
    process: false,
  }
  componentDidMount() {
    let {lat, lng} = this.props.navigation.getParam('location');
    setTimeout(function () {
      this.moveCamera(lat, lng);
    }.bind(this), 300);
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
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="SAVE"/>
        </Form>
      </Content>
    )
  }
  onClickAdd() {
    this.props.navigation.navigate('Home');
  }
  onRegionChange(region) {
    this.setState({address: ""})
    this.moveMarker(region.latitude, region.longitude);
  }
  onRegionChangeComplete(region) {
    this.getLocation();
  }
  getLocation() {
    let {lat, lon} = this.state;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU`;
    axios.get(url)
    .then(res => {
      let address = res.data.results[1].formatted_address;
      this.setState({address});
    })
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
}

const CustomStyle = StyleSheet.create({
  map: {
    width:'100%',
    height:260,
  },
})

export default SearchLocationAddressForm;
