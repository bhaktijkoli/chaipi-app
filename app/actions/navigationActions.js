import { StackActions, NavigationActions } from 'react-navigation';

module.exports.homeAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

module.exports.SetupAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ProfileSetup' })],
});
