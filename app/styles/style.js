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
    margin: 15,
  },
  heading: {
  },
  label: {
    marginLeft: 10,
  },
  input: {
    marginTop:5,
    marginBottom:5,
    borderColor: platform === "ios" ? "#007aff" : "#3F51B5",
  },
  button: {
    marginTop:5,
    marginBottom:5,
  }
});
