import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider } from 'native-base';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

import Login from './app/screens/Login/Login';
import Logout from './app/screens/Login/Logout';
import OTPVerify from './app/screens/OTPVerify/OTPVerify';
import ProfileSetup from './app/screens/ProfileSetup/ProfileSetup';
import Home from './app/screens/Home/Home';
import Account from './app/screens/Account/Account';
import Products from './app/screens/Account/Products/Products';
import AddProduct from './app/screens/Account/AddProduct/AddProduct';

const App = () => {
  return(
    <Root>
      <StyleProvider style={getTheme(commonColor)}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </StyleProvider>
    </Root>
  )
}

const SubNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Account: { screen: Account },
    Products: { screen: Products },
    AddProduct: { screen: AddProduct },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const DrawerNavigator = createDrawerNavigator({
  Sub: {screen: SubNavigator }
})



const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Logout: { screen: Logout },
  OTPVerify: { screen: OTPVerify },
  ProfileSetup: { screen: ProfileSetup },
  Home: { screen: DrawerNavigator }
});

const AppContainer =  createAppContainer(AppNavigator);
export default App;
