import React, { Component } from 'react';
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
import Shop from './app/screens/Shop/Shop';
import Cart from './app/screens/Cart/Cart';
import SelectPayment from './app/screens/SelectPayment/SelectPayment';
import OrderDetails from './app/screens/OrderDetails/OrderDetails';
import Checkout from './app/screens/Checkout/Checkout';
import Account from './app/screens/Account/Account';
import Profile from './app/screens/Account/Profile/Profile';
import Subscription from './app/screens/Subscription/Subscription';
import Address from './app/screens/Account/Address/Address';
import AddAddress from './app/screens/Account/AddAddress/AddAddress';
import AddCard from './app/screens/Account/AddCard/AddCard';
import PartnerWithUs from './app/screens/Account/PartnerWithUs/PartnerWithUs';
import fcm from './app/utils/fcm'

class App extends Component {
  async componentDidMount() {
    fcm.init(this.refs.navigation._navigation);
  }
  render() {
    return(
      <Root>
        <StyleProvider style={getTheme(commonColor)}>
          <Provider store={store}>
            <AppContainer ref="navigation"/>
          </Provider>
        </StyleProvider>
      </Root>
    )
  }

}



const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Logout: { screen: Logout },
    OTPVerify: { screen: OTPVerify },
    ProfileSetup: { screen: ProfileSetup },
    Home: { screen: Home },
    Shop: { screen: Shop },
    Cart: { screen: Cart },
    SelectPayment: { screen: SelectPayment },
    OrderDetails: { screen: OrderDetails },
    Account: { screen: Account },
    Profile: { screen: Profile },
    Subscription: { screen: Subscription },
    Address: { screen: Address },
    AddAddress: { screen: AddAddress },
    AddCard: { screen: AddCard },
    PartnerWithUs: { screen: PartnerWithUs },
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer =  createAppContainer(AppNavigator);
export default App;
