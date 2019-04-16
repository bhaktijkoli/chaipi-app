import React, { Component } from 'react';
import { Form, Item, Label, Text, Input, Textarea, Icon, Button, Toast } from 'native-base';
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service';

import Style from './../../../styles/style';

class AddAddressForm extends Component {
  state = {
    location: '',
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=YOUR_API_KEY`;
        console.log(url);
        axios.get(url)
        .then(res => {
          console.log(res.data);
          let location = res.data.results[0].formatted_address;
          this.setState({location});
        })
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    return(
      <Form style={Style.bottom}>
        <Label>Location</Label>
        <Item regular style={Style.inputRegularError}>
          <Input
            placeholder="Searching your location"
            value={this.state.location} />
        </Item>
      </Form>
    )
  }
}

export default AddAddressForm;
