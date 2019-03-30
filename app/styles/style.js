import { StyleSheet } from 'react-native';
import { Platform } from "react-native";

const platform = Platform.OS;

export default StyleSheet.create({
  top: {
    marginTop:20,
  },
  bottom: {
    marginBottom:20,
  },
  mg10: {
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    padding: 15,
  },
  heading: {
  },
  label: {
    marginLeft: 10,
  },
  homeLabel: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 20,
    marginTop: 5,
  },
  input: {
    marginTop:5,
    marginBottom:10,
    marginLeft: 0,
    marginRight: 0,
    borderColor: '#f39c12',
  },
  inputNoBorder: {
    marginTop:5,
    marginBottom:10,
    marginLeft: 0,
    marginRight: 0,
  },
  inputRegular: {
    marginTop:5,
    marginBottom:20,
    marginLeft: 0,
    marginRight: 0,
  },
  inputRegularError: {
    marginTop:5,
    marginBottom:0,
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    marginTop:10,
    marginBottom:5,
  },
  lightColor: {
    color: '#575757',
  },
  error: {
    color: '#ed2f2f',
    marginBottom: 10,
  }
});
