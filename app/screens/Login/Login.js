import React, { Component } from 'react';
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { Container, Content, View, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'react-native-firebase';

import Request from './../../utils/request';
import Fcm from './../../utils/fcm';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import Style from './../../styles/style';

import LoginForm from './LoginForm';

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
  async componentDidMount() {
    const setAskForPermissions = await AsyncStorage.getItem('ASKED_FOR_PERMISSIONS');
    if(!setAskForPermissions) {
      NavigationActions.resetNavigation(this, "Permissions");
      return;
    }
    let user = null
    this.authChange = firebase.auth().onAuthStateChanged((u) => {
      if(user) return;
      user = u;
      if(user) {
        let data = {uid: user._user.uid, phone: user._user.phoneNumber}
        AuthActions.setUserUID(data);
        Request.get('/user/get/'+user._user.uid)
        .then(res => {
          AuthActions.setUser(res.data);
          Request.setToken(user._user.uid)
          AuthActions.getOrder();
          Fcm.syncToken();
          Fcm.checkNotification(() => {
            AuthActions.loadCurrentAddress();
            this.props.navigation.dispatch(NavigationActions.homeAction);
          })
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
