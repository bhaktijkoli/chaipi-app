import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer, DrawerItems, SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import { Root, StyleProvider, View } from 'native-base';
import { Image } from 'react-native';
import { fadeIn } from 'react-navigation-transitions';
import store from "./app/store";
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

import Login from './app/screens/Login/Login';
import Logout from './app/screens/Login/Logout';
import OTPVerify from './app/screens/OTPVerify/OTPVerify';
import ProfileSetup from './app/screens/ProfileSetup/ProfileSetup';
import Home from './app/screens/Home/Home';
import SearchLocation from './app/screens/SearchLocation/SearchLocation';
import SearchLocationAddress from './app/screens/SearchLocationAddress/SearchLocationAddress';
import Search from './app/screens/Search/Search';
import Shop from './app/screens/Shop/Shop';
import Cart from './app/screens/Cart/Cart';
import SelectPayment from './app/screens/SelectPayment/SelectPayment';
import OrderDetails from './app/screens/OrderDetails/OrderDetails';
import Checkout from './app/screens/Checkout/Checkout';
import Account from './app/screens/Account/Account';
import Profile from './app/screens/Account/Profile/Profile';
import Cards from './app/screens/Account/Cards/Cards';
import Subscription from './app/screens/Subscription/Subscription';
import Address from './app/screens/Account/Address/Address';
import AddAddress from './app/screens/Account/AddAddress/AddAddress';
import AddCard from './app/screens/Account/AddCard/AddCard';
import Favorites from './app/screens/Account/Favorites/Favorites';
import OrderHistory from './app/screens/Account/OrderHistory/OrderHistory';
import PartnerWithUs from './app/screens/Account/PartnerWithUs/PartnerWithUs';
import Help from './app/screens/Account/Help/Help';
import About from './app/screens/Account/About/About';
import Legal from './app/screens/Account/Legal/Legal';
import OrderItem from './app/screens/Account/OrderHistory/OrderItem';
import Copyright from './app/screens/Account/Copyright/Copyright';
import TermsConditions from './app/screens/Account/TermsConditions/TermsConditions';
import PrivacyPolicy from './app/screens/Account/PrivacyPolicy/PrivacyPolicy';
import SoftwareLicenses from './app/screens/Account/SoftwareLicenses/SoftwareLicenses';
import Pricing from './app/screens/Account/Pricing/Pricing';
import AccountPaymentOptions from './app/screens/Account/AccountPaymentOptions/AccountPaymentOptions';
import GuidetoChaiPi from './app/screens/Account/GuidetoChaiPi/GuidetoChaiPi';
import Sidebar from './app/screens/Account/Sidebar';
import Basics from './app/screens/Account/GuidetoChaiPi/Basics/Basics';
import Policies from './app/screens/Account/GuidetoChaiPi/Policies/Policies';
import fcm from './app/utils/fcm'
import { ScrollView } from 'react-native-gesture-handler';
import Permissions from './app/screens/Permissions/Permissions';
import Whatischaipi from './app/screens/Account/GuidetoChaiPi/Basics/Whatischaipi';
import Howchaipiwork from './app/screens/Account/GuidetoChaiPi/Basics/Howchaipiwork';
import Chaipiavailable from './app/screens/Account/GuidetoChaiPi/Basics/Chaipiavailable';
import Howplaceorder from './app/screens/Account/GuidetoChaiPi/Basics/Howplaceorder';
import Leavetip from './app/screens/Account/GuidetoChaiPi/Basics/Leavetip';
import Deliverytime from './app/screens/Account/GuidetoChaiPi/Basics/Deliverytime';
import Deliverypartner from './app/screens/Account/GuidetoChaiPi/Basics/Deliverypartner';
import Cancelpolicy from './app/screens/Account/GuidetoChaiPi/Policies/Cancelpolicy';
import Multipleorder from './app/screens/Account/GuidetoChaiPi/Policies/Multipleorder';
import Neverarrivedorder from './app/screens/Account/GuidetoChaiPi/Policies/Neverarrivedorder';


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

const CustomDrawerComponent = (props) => (
  <SafeAreaView style = {{flex: 1}}>
    <View style = {{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)


const MyDrawerNavigator  = createDrawerNavigator(
  {
    Home: { screen: Home },
    SearchLocation: { screen: SearchLocation },
    SearchLocationAddress: { screen: SearchLocationAddress },
    Cart: { screen: Cart },
    Account: { screen: Account },
    Search: { screen: Search },
  },
  {
    contentComponent: Sidebar
  }
);

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Logout: { screen: Logout },
    OTPVerify: { screen: OTPVerify },
    ProfileSetup: { screen: ProfileSetup },
    Home: { screen: MyDrawerNavigator },
    Search: { screen: MyDrawerNavigator },
    Shop: { screen: Shop },
    Cart: { screen: MyDrawerNavigator },
    SelectPayment: { screen: SelectPayment },
    OrderDetails: { screen: OrderDetails },
    Account: { screen: MyDrawerNavigator },
    Cards: { screen: Cards },
    Profile: { screen: Profile },
    Subscription: { screen: Subscription },
    Address: { screen: Address },
    AddAddress: { screen: AddAddress },
    AddCard: { screen: AddCard },
    Favorites: { screen: Favorites },
    OrderHistory: { screen: OrderHistory },
    OrderItem: { screen: OrderItem},
    PartnerWithUs: { screen: PartnerWithUs },
    Help: { screen: Help},
    About: { screen: About},
    Legal: { screen: Legal},
    Copyright: { screen: Copyright},
    TermsConditions: { screen: TermsConditions},
    PrivacyPolicy: { screen: PrivacyPolicy},
    SoftwareLicenses: { screen : SoftwareLicenses},
    Pricing: {screen: Pricing},
    AccountPaymentOptions: { screen: AccountPaymentOptions},
    GuidetoChaiPi: { screen: GuidetoChaiPi },
    Basics: { screen: Basics},
    Policies: { screen: Policies },
    Permissions: { screen: Permissions},
    Whatischaipi: { screen: Whatischaipi },
    Howchaipiwork: { screen: Howchaipiwork },
    Chaipiavailable: { screen: Chaipiavailable },
    Howplaceorder: { screen: Howplaceorder },
    Leavetip: { screen: Leavetip },
    Deliverytime: {screen: Deliverytime },
    Deliverypartner: { screen: Deliverypartner },
    Cancelpolicy: { screen: Cancelpolicy },
    Multipleorder: { screen: Multipleorder },
    Neverarrivedorder: { screen: Neverarrivedorder },
  },
  {
    transitionConfig: () => fadeIn(),
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer =  createAppContainer(AppNavigator);
export default App;
