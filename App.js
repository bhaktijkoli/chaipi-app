import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider } from 'native-base';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import Login from './app/screens/Login/Login';
import OTPVerify from './app/screens/OTPVerify/OTPVerify';
import ProfileSetup from './app/screens/ProfileSetup/ProfileSetup';
import Home from './app/screens/Home/Home';
import Account from './app/screens/Account/Account';
import AddProduct from './app/screens/Account/AddProduct/AddProduct';

const App = () => {
  return(
    <Root>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Root>
  )
}

const DrawerNavigator = createDrawerNavigator({
  Home: { screen: Home },
  Account: { screen: Account },
  AddProduct: { screen: AddProduct },
})

DrawerNavigator.navigationOptions = {
    header: null
};


const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  OTPVerify: { screen: OTPVerify },
  ProfileSetup: { screen: ProfileSetup },
  Home: { screen: DrawerNavigator }
});
const AppContainer =  createAppContainer(AppNavigator);
export default App;
