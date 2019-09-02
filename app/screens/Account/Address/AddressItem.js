import React, { Component } from 'react';
import { View, Card, CardItem, Text, Button, Icon, H3, Toast } from 'native-base';

import Request from './../../../utils/request';

class AddressItem extends Component {
  render() {
    let { item, navigation } = this.props;
    item = item.item;
    let icon = item.type;
    if(icon == "home") {
      icon = "home";
    } else if(icon == "work") {
      icon = "briefcase";
    } else {
      icon = "location-pin"
    }
    return(
      <View style={{padding:10}}>
        <View style={{flexDirection: 'row'}}>
          <H3><Icon name={icon} type="Entypo"/>&nbsp;{item.type.toUpperCase()}</H3>
        </View>
        <Text style={{fontSize:18}}>{item.house},{item.landmark},{item.address}</Text>
        <View style={{flexDirection:'row', marginTop: 5, alignItems: 'flex-end'}}>
          <Button bordered small style={{alignItems: "flex-start"}} onPress={this.onDelete.bind(this)}>
            <Text>Delete</Text>
          </Button>
        </View>
      </View>
    )
  }
  onDelete() {
    let data = {address: this.props.item.item.id}
    console.log(data);
    Request.post('/address/delete', data)
    .then(res => {
      Toast.show({text: "Address Deleted.", buttonText: "Ok"})
      this.props.update();
    })
  }
}

export default AddressItem;
