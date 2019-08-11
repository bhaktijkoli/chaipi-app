import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, Image } from 'react-native';
import { Container, Content, Button, ListItem, Left, Right, Body, Icon, Text } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

class Cards extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Saved Cards"/>
        <ScrollView style={Style.content}>
          {
            this.props.auth.cards.map((el, key ) => {
              return(
                <ListItem icon>
                  <Left>
                    <Image source={require("./../../../../node_modules/react-native-credit-card-input/src/icons/stp_card_visa.png")}/>
                  </Left>
                  <Body>
                    <Text>{el.number[0] + el.number[1] + 'XX XXXX XXXX XX' + el.number[el.number.length-1] + el.number[el.number.length-2]}</Text>
                  </Body>
                </ListItem>
              )
            })
          }
          <Button block primary onPress={e=>this.props.navigation.navigate('AddCard')} style={Style.top}>
            <Text>Add New Card</Text>
          </Button>
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

export default connect(mapStateToProps)(Cards);
