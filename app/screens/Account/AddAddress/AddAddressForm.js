import React, { Component } from 'react';
import { Content, Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import { StyleSheet } from 'react-native';
import ButtonEx from './../../../components/Button';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import Style from './../../../styles/style';
import Request from './../../../utils/request';

class AddAddressForm extends Component {
  state = {
    location: '',
    house: '',
    landmark: '',
    house_error: '',
    landmark_error: '',
    lat: 0,
    lon: 0,
    process: false,
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.setState({lat, lon});
        console.log(lat, lon);
        // let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAjSpjnhZHk2PA0JyHoEAHEKJHvvgHdjRA`;
        // axios.get(url)
        // .then(res => {
        //   console.log(res);
        //   let location = res.data.results[0].formatted_address;
        //   this.setState({location, lat, lon});
        // })
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    let region = {
      latitude: this.state.lat,
      longitude: this.state.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    let coordinate = {
      latitude: this.state.lat,
      longitude: this.state.lon,
    }
    return(
      <Content>
        <MapView
          style={CustomStyle.map}
          region={region}>
          <Marker
            coordinate={coordinate}
            >
          </Marker>
        </MapView>
        <Form style={Style.content}>
          <Label>Location</Label>
          <Item regular style={Style.inputRegularError}>
            <Input
              placeholder="Searching your location"
              value={this.state.location} />
          </Item>
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
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="ADD"/>
        </Form>
      </Content>
    )
  }
  onClickAdd() {
    this.setState({process: true, house_error: '', landmark_error: ''})
    Request.post('/address/add', this.state)
    .then(res => {
      if(res.data.success) {
        Toast.show({text: `Address has been added.`, buttonText: 'Ok'});
        this.props.navigation.navigate('Home');
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
  }

  const CustomStyle = StyleSheet.create({
    map: {
      width:'100%',
      height:200,
    },
  })

  export default AddAddressForm;
