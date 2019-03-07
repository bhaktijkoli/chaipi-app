import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import LoginScreen from './app/screens/Login/LoginScreen';
import OTPVerifyScreen from './app/screens/OTPVerify/OTPVerifyScreen';
import HomeScreen from './app/screens/Home/HomeScreen';


const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  }
})


const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  OTPVerify: {
    screen: OTPVerifyScreen
  },
  Home: {
    screen: createAppContainer(DrawerNavigator)
  }
});
export default createAppContainer(AppNavigator);
