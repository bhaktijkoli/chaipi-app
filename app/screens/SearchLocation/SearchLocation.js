import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, View, Text, Icon } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Header from './../../components/Header2'

import Auth from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

// key: 'AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU'

class SearchLocation extends Component {
  render() {
    let addresses = this.props.auth.addresses;
    let predefinedPlaces = [];
    addresses.forEach(a => {
      predefinedPlaces.push({description: a.type, name: a.type, geometry: { location: { lat: a.lat, lng: a.lon } }})
    })
    // const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    return(
      <Container>
        <Header title="Set your location" />
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          returnKeyType={'default'}
          fetchDetails={true}
          query={{
            key: 'AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU',
            language: 'en', // language of the results
          }}
          predefinedPlaces={predefinedPlaces}
          autoFocus={true}
          currentLocation={true}
          onPress={this.onLocationSelected}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          />
      </Container>
    )
  }
  onLocationSelected = (data, details) => {
    console.log("Data", data);
    console.log("details", details);
    let type = "";
    if(data.structured_formatting) {
      type = data.structured_formatting.main_text;
    } else {
      type = data.name;
    }
    console.log("type", type);
    let lat = details.geometry.location.lat;
    let lon = details.geometry.location.lng;
    console.log(lat, lon);
    let currentLocation = {
      type, lat, lon
    };
    Auth.setCurrentAddress(currentLocation);
    NavigationActions.resetNavigation(this, "Home");
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SearchLocation);
