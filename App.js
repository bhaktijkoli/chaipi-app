import { createStackNavigator, createAppContainer } from "react-navigation";
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import LoginScreen from './app/screens/Login/LoginScreen';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
});

export default createAppContainer(AppNavigator);
