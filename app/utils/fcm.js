import firebase from 'react-native-firebase';
import type { Notification, RemoteMessage, NotificationOpen } from 'react-native-firebase';
import Request from './request';
import authActions from './../actions/authActions';

let fcmToken = null;
let navigation = null;
let notificationDisplayedListener = null;
let notificationListener = null;
let notificationOpenedListener = null;
let messageListener = null;
let hasPermission = false;
let init = async (n) => {
  navigation = n;
  fcmToken = await firebase.messaging().getToken();
  if(fcmToken) {
    firebase.messaging().requestPermission().then(() => {
      hasPermission = true;
      console.log("Device has been Authorized");
      console.log("Token:", fcmToken);
    })
  }
}

let startListining = () => {
  console.log("Started startListining");
  notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
    console.log("Notification displayed");
    console.log(notification);
  });
  notificationListener = firebase.notifications().onNotification((notification: Notification) => {
    console.log("Notification recieved");
    console.log(notification);
  });
  notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    console.log("Notification open");
    const action = notificationOpen.action;
    const notification: Notification = notificationOpen.notification;
    performNotification(notification);
  });
  messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
    console.log("Remote message recieved");
    console.log(message);
    performMessageAction(message.data);
  });
}

let syncToken = async () => {
  console.log("Start token sync");
  if(fcmToken) {
    Request.post('/device/sync', {token: fcmToken})
    .then(res => {
      startListining();
    });
  }
}

let checkNotification = async (callback) => {
  let notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    console.log("App opended by notification");
    const notification: Notification = notificationOpen.notification;
    performNotification(notification);
  } else {
    callback();
  }
}

let performNotification = async (notification: Notification) => {
  let payload = JSON.parse(notification.data.payload);
  if(payload) {
    navigation.navigate(payload.screen);
    return true;
  }
  return false;
}

let performMessageAction = async (data) => {
  let payload = JSON.parse(data.payload);
  switch (payload.action) {
    case "ACTIVE_ORDER":
    authActions.getOrder();
    break;
    default:
    console.log("Invalid action");
  }
}

module.exports.init = init;
module.exports.syncToken = syncToken;
module.exports.startListining = startListining;
module.exports.checkNotification = checkNotification;
module.exports.performNotification = performNotification;
module.exports.performMessageAction = performMessageAction;
