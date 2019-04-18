import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, Text, Toast } from 'native-base';

import Header2 from './../../../components/Header2';
import ButtonEx from './../../../components/Button';
import Style from './../../../styles/style';
import Request from './../../../utils/request';

import { CreditCardInput } from "react-native-credit-card-input";

class AddCard extends Component {
  state = {
    card: null,
    process: false,
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Header2 title="Add Card"/>
        <Content style={Style.content}>
          <CreditCardInput
            labels={{number: "Card number", expiry: "Expiry", cvc: "CVC/CCV"}}
            placeholders={{number: "xxxx xxxx xxxx xxxx", expiry: "MM/YYY", cvc: "CCV"}}
            onChange={card=>this.setState({card})}/>
          <ButtonEx onPress={this.onClickAdd.bind(this)} loading={this.state.process} text="ADD"/>
        </Content>
      </Container>
    )
  }
  onClickAdd() {
    let { card } = this.state;
    let { status } = card;
    console.log(card);
    if(status.number != "valid" || status.expiry != "valid" || status.cvc != "valid") {
      return;
    }
    this.setState({process:true})
    Request.post('/card/add', card.values)
    .then(res => {
      console.log(res.data);
      if(res.data.success) {
        Toast.show({text: `Your card has been added.`, buttonText: 'Ok'});
        this.props.navigation.navigate('Home')
      }
    })
    .finally(() => {
      this.setState({process:false})
    })
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AddCard);
