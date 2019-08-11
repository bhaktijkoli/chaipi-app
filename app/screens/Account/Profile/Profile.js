import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView } from 'react-native';
import { Container, Content, Form, Item, Label, Input } from 'native-base';
import ButtonEx from './../../../components/Button';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import AuthActions from './../../../actions/authActions';
import Header2 from './../../../components/Header2';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: this.props.auth.user.fullname,
      process: false,
    }
  }
  render() {
    return(
      <Container>
        <Header2 title="Your Profile"/>
        <ScrollView>
          <Form style={Style.content}>
            <Label>Fullname</Label>
            <Item regular style={Style.input}>
              <Input value={this.state.fullname} onChangeText={fullname => this.setState({fullname})}/>
            </Item>
            <ButtonEx onPress={this.onClickSave} loading={this.state.process} text="SAVE"/>
          </Form>
        </ScrollView>
      </Container>
    )
  }
  onClickSave = () => {
    this.setState({process: true});
    Request.post('/user/update/fullname', {fullname: this.state.fullname})
    .then(res => {
      this.setState({process: false});
      this.props.navigation.navigate('Home');
    })
    .catch(err => console.error(err))
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
