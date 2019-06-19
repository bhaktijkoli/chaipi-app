import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

import authActions from './../actions/authActions';
import fcm from './../utils/fcm';

export default async (message: RemoteMessage) => {
  console.log("message", message);
  fcm.performMessageAction(message.data);
  return Promise.resolve();
}
