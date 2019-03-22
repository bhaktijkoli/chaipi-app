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
  content: {
    padding: 15,
  },
  heading: {
  },
  label: {
    marginLeft: 10,
  },
  input: {
    marginTop:5,
    marginBottom:10,
    marginLeft: 0,
    marginRight: 0,
    borderColor: platform === "ios" ? "#007aff" : "#3F51B5",
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
  error: {
    color: '#ed2f2f',
    marginBottom: 10,
  }
});
