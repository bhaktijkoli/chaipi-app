import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, DatePicker, Label, Icon} from 'native-base';
import { Form, Item, Input } from 'native-base';
import { H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import ButtonEx from './../../components/Button';

const ImagePicker = require('react-native-image-picker');

import Request from './../../utils/request';
import Style from './../../styles/style';
import AuthActions from './../../actions/authActions';
import NavigationActions from './../../actions/navigationActions';
import { If, Then, Else } from 'react-if';


const profileImageOptions = {
  title: 'Select Profile Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ProfileSetup extends Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    image: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      //dob: '',
      email: '',
      phone: '',
      process: false,
    }
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickLogout = this.onClickLogout.bind(this)
  }
  componentDidMount() {
  }
  render() {
    return(
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <ScrollView>
          <Grid style={{alignItems: 'flex-end'}}>
            <Col style={Style.content}>
              <Form style={Style.bottom}>
                <H1 style={Style.heading}>Welcome</H1>
                <Text style={Style.label}>Setup your profile</Text>
                <Item style={Style.input}>
                  <Input
                    value={this.state.fullname}
                    onChangeText={val=>this.setState({fullname: val})}
                    placeholder='Enter fullname' />
                </Item>
                <Item style = {Style.input}>
                  <Input
                  value ={this.state.email}
                  onChangeText={val=>this.setState({email: val})}
                  placeholder='Enter email address'
                  />
                </Item>
                <Item style = {Style.input}>
                  <Input
                  value = {this.state.phone}
                  onChangeText={val=>this.setState({phone: val})}
                  placeholder="Enter contact number"
                  />
                </Item>
                {/*<Item style = {Style.input}>
                  <DatePicker placeHolderText = "Enter birthdate"
                  value = {this.setState.dob}
                  onChangeText={val=>this.setState({dob: val})}
                  />
    </Item>*/}
                  <Label style = {Style.top}>Profile Picture</Label>
                  <If condition={this.state.image==null}>
                    <Then>
                      <Button style={Style.input} bordered onPress={this.changeImage.bind(this)}>
                        <Icon name="pluscircleo" type="AntDesign"/>
                      </Button>
                    </Then>
                    <Else>
                      <TouchableOpacity activeOpacity = { .5 } onPress={this.changeImage.bind(this)}>
                        <Image source={this.state.image} style={{width:152, height:152, marginTop:10, marginBottom: 20}} onPress={this.changeImage.bind(this)}/>
                      </TouchableOpacity>
                    </Else>
                  </If>
                <ButtonEx onPress={this.onClickNext} loading={this.state.process} text="NEXT"/>
                <Button transparent block onPress={this.onClickLogout}>
                  <Text>Logout</Text>
                </Button>
              </Form>
            </Col>
          </Grid>
          </ScrollView>
        </Content>
      </Container>
    )
  }
  onClickNext() {
    this.setState({process: true});
    let data = {
      uid: this.props.auth.uid,
      fullname: this.state.fullname,
      email: this.state.email,
      phone: this.state.phone,
      //dob: this.state.dob,
    };
    Request.post('/user/add', data)
    .then(res => {
      Request.get('/user/get/'+this.props.auth.uid)
      .then(res => {
        AuthActions.setUser(res.data);
        NavigationActions.resetNavigation(this, 'Login');
      })
    })
    .catch(err => console.error(err))
    .finally(()=> this.setState({process: false}))
  }
  onClickLogout() {
    this.props.navigation.navigate("Logout");
  }
  changeImage() {
    ImagePicker.showImagePicker(profileImageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          image: { uri: response.uri, name: response.fileName, type: response.type },
        });
      }
    });
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ProfileSetup);
