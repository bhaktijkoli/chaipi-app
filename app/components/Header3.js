import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Header, Left, Body, Right, Button, Title, Subtitle, Icon, Text } from 'native-base';
import { createDrawerNavigator } from "react-navigation";


import Style from './../styles/style';

class Header3 extends Component {
  render() {
   /* this.state(
       currentlocation = ""
    )*/
    let location = "NOW";
    
    if(this.props.auth.current_address) {
      location = this.props.auth.current_address.type;
    }
    /*if(this.props.auth.current_address) {
      currentlocation = this.props.auth.current_address.type;
    }*/
    location = location.charAt(0).toUpperCase() + location.slice(1);
    //currentlocation = currentlocation.charAt(0).toUpperCase() + currentlocation.slice(1);

    return(
      <Header transparent style = {{backgroundColor: '#ffa500'}}
      >
        <Left>
          <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{color:'#FFF'}}/>
        </Left>
        <Body>
          <Title style={{color:'#FFF'}} onPress={e=>this.props.navigation.navigate('SearchLocation')}>{location}</Title>
    {/*<Subtitle>{this.state.currentlocation}</Subtitle>*/}
        </Body>
        <Right>
          {this.renderRight()}
        </Right>
      </Header>
    )
  }

  renderRight = () => {
    if(this.props.right) {
      return this.props.right();
    }
  }
}

export default withNavigation(Header3);
