import React, { Component } from 'react';
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content, View, Title, Text, List} from 'native-base';

import Style from './../../../styles/style';
import Request from './../../../utils/request';
import Header2 from './../../../components/Header2';
import AuthActions from './../../actions/authActions';


class Profile extends Component {

  constructor(props){
    super(props)
    this.state= {
      FullName : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    return(
      <Container>
        <Header2 title="Your Profile"/>
        <ScrollView>
        <Item style={Style.input}>
                  <Input
                    value={this.state.FullName}
                    onChangeText={val=>this.setState({FullName: val})}
                    placeholder='Enter fullname' />
                </Item>
        </ScrollView>
        <View>
          <TouchableOpacity
          style = {CustomStyle.saveButton}
          onPress={this.handleSubmit}
          >
            <Text style = {CustomStyle.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }

  handleSubmit() {
    let data = {
      uid: this.props.auth.uid,
      FullName: this.state.FullName
    };
    Request.post('/user/add', data)
    .then(res => {
      Request.get('/user/get'+this.props.auth.uid)
      .then(res => {
        AuthActions.setUser(res.data);
      })      
    })
    .catch(err => console.error(err))
    .finally(()=> this.setState({process: false}))
  }
}

const CustomStyle = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
