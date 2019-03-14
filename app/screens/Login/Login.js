import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Content, View, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';

import Request from './../../utils/request';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Style from './../../styles/style';

import LoginForm from './LoginForm'

class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
    }
  }
  componentDidMount() {
    let user = null
    this.authChange = firebase.auth().onAuthStateChanged((u) => {
      if(user) return;
      user = u;
      if(user) {
        AuthActions.setUserUID(this, user._user.uid);
        Request.get('/user/get/'+user._user.uid)
        .then(res => {
          AuthActions.setUser(this, res.data);
          this.props.navigation.dispatch(NavigationActions.homeAction);
        })
        .catch(err => {
          this.props.navigation.dispatch(NavigationActions.SetupAction);
        })
      } else {
        this.setState({loading:false})
      }
    });
  }
  componentWillUnmount() {
    this.authChange = null;
  }
  render() {
    if(this.state.loading) {
      return(
        <View></View>
      )
    }
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid style={{alignItems: 'flex-end'}}>
            <Col style={Style.content}>
              <LoginForm navigation={this.props.navigation}/>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
