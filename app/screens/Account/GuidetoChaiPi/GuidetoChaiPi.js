import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text, View } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

import GuidetoChaiPiForm from './GuidetoChaiPiForm';

class GuidetoChaiPi extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Help"/>
        <View
        style = {{
<<<<<<< HEAD
          borderBottomColor: 'gainsboro',
=======
          borderBottomColor: 'black',
>>>>>>> ca3a35bab879813892f7e8cadde029da6463ba41
          borderBottomWidth: 1,
        }}
        ></View>
        <ScrollView style={Style.content}>
        <GuidetoChaiPiForm auth={this.props.auth} navigation={this.props.navigation}/>

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

export default connect(mapStateToProps)(GuidetoChaiPi);
