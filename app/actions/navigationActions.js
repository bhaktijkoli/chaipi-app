import { StackActions, NavigationActions } from 'react-navigation';

module.exports.homeAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

module.exports.loginAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

module.exports.SetupAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ProfileSetup' })],
});

module.exports.resetNavigation = (component, routeName) => {
  component.props.navigation.dispatch(StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  }));
}
