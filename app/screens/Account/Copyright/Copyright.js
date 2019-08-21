import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text, View } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

import CopyrightForm from './CopyrightForm';

class Copyright extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Copyright"/>
        <View
        style = {{
<<<<<<< HEAD
            borderBottomColor: 'gainsboro',
=======
            borderBottomColor: 'dimgray',
>>>>>>> ca3a35bab879813892f7e8cadde029da6463ba41
            borderBottomWidth: 1,
        }}
        ></View>
        <ScrollView style={Style.content}>
        <CopyrightForm auth={this.props.auth} navigation={this.props.navigation}/>

        </ScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Copyright);
