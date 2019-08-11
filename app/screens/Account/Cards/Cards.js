import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, Text } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';

class Cards extends Component {
  render() {
    return(
      <Container>
        <Header2 title="Saved Cards"/>
        <ScrollView style={Style.number}>
          {
            this.props.auth.cards.map((el, key ) => {
              return(
                <Text key={key}>{el.number}</Text>
              )
            })
          }
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
