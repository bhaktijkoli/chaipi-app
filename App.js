import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import LoginScreen from './app/screens/Login/LoginScreen';
import OTPVerifyScreen from './app/screens/OTPVerify/OTPVerifyScreen';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  OTPVerify: {
    screen: OTPVerifyScreen
  }
});

export default createAppContainer(AppNavigator);
