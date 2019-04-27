import React, { Component } from 'react';
import { View, Text, Button, Toast } from 'native-base';

import Request from './../../../utils/request';

class AddressItem extends Component {
  render() {
    let { item, navigation } = this.props;
    item = item.item;
    return(
      <View style={{padding:10}}>
        <Text style={{fontSize:18}}>{item.house},{item.landmark},{item.location}</Text>
        <View style={{flexDirection:'row', marginTop: 5}}>
          <Button bordered small style={{alignItems: "flex-start", marginRight:10}}>
            <Text>Edit</Text>
          </Button>
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
