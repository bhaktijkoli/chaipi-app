import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Text} from 'native-base';
import { Item, Input, Button } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Request from './../../utils/request';
import Styles from './../../styles/default';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';

class ProfileSetup extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      email: '',
    }
    this.onClickNext = this.onClickNext.bind(this)
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content>
          <Grid>
            <Col style={[Styles.top, Styles.content]}>
              <H1 style={Styles.heading}>Welcome</H1>
              <Text style={Styles.label}>Setup your profile</Text>
              <Item regular style={Styles.input}>
                <Input
                  value={this.state.fullname}
                  onChangeText={val=>this.setState({fullname: val})}
                  placeholder='Enter fullname' />
              </Item>
              <Item regular style={Styles.input}>
                <Input
                  keyboardType='email-address'
                  value={this.state.email}
                  onChangeText={val=>this.setState({email: val})}
                  placeholder='Enter email' />
              </Item>
              <Button block style={Styles.button} onPress={this.onClickNext}><Text>Next</Text></Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
  onClickNext() {
    let data = {
      uid: this.props.auth.uid,
      fullname: this.state.fullname,
      email: this.state.email
    };
    Request.post('/user/add', data)
    .then(res => {
      Request.get('/user/get/'+this.props.auth.uid)
      .then(res => {
        AuthActions.setUser(this, res.data);
        this.props.navigation.dispatch(NavigationActions.homeAction);
      })
    })
    .catch(err => console.error(err))
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ProfileSetup);
