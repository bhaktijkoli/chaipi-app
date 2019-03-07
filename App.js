import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { StyleProvider } from 'native-base';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import LoginScreen from './app/screens/Login/LoginScreen';
import OTPVerifyScreen from './app/screens/OTPVerify/OTPVerifyScreen';
import HomeScreen from './app/screens/Home/HomeScreen';

const App = () => {
  return(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

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
const AppContainer =  createAppContainer(AppNavigator);
export default App;
