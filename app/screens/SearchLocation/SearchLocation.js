import React, { Component } from 'react';
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, View, Text, Icon } from 'native-base';
import { ListItem, Left, Body } from 'native-base';
import { Form, Item, Input } from 'native-base';
import GPlaces from 'react-native-gplaces';
import { If } from 'react-if';

import Header from './../../components/Header2'

import Auth from './../../actions/authActions';
import Request from './../../utils/request';
import Style from './../../styles/style';

const places = new GPlaces({
  key: 'AIzaSyB725g4AZKR2idp-yY5opgxFrV_wR2z2MU'
});

class SearchLocation extends Component {
  state = {
    search: 'chendani',
    places: [],
  }
  render() {
    let addresses = this.props.auth.addresses;
    let icon = this.state.search.length?'close':'search1'
    return(
      <Container>
        <Header title={`Set your Location`}/>
        <Form>
          <Item regular style={Style.inputSearch}>
            <Input
              returnKeyType={"search"}
              placeholder="Search for area, street name..."
              value={this.state.search}
              onSubmitEditing={this.getPlaces}
              onChangeText={search=>this.onChangeSearch(search)}/>
            <Icon name={icon} type="AntDesign" onPress={e=>this.setState({search:''})}/>
          </Item>
        </Form>
        <Content>
          <FlatList
            data={this.state.places}
            renderItem={({item, index}) => { return this.renderPlaceItem(item) }}
            keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </Content>
      </Container>
    )
  }
  renderPlaceItem = (place) => {
    return(
      <ListItem onPress={e=>this.onClickLocation(place)}>
        <Body>
          <Text>
            {place.description}
          </Text>
        </Body>
      </ListItem>
    )
  }
  onClickLocation = (place) => {
    places.getPlaceDetails(place.place_id, {
      fields: 'geometry'
    })
    .then(r => {
      this.props.navigation.navigate('SearchLocationAddress', {location: r.geometry.location});
    })
    .catch(err => console.error(err))
  }
  onChangeSearch = (search) => {
    this.setState({search});
  }
  getPlaces = () => {
    places.search(this.state.search, {
      components: 'country:in',
      types: 'geocode'
    })
    .then(places => {
      console.log(places);
      this.setState({places});
    })
    .catch(err => console.error(err))
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SearchLocation);
