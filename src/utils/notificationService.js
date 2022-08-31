import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/native';
import {routesPath} from '../routes/routesPath';
import {navigationRef} from '../../App';
import {getUpComingOrderMiddleWare} from '../modules/myordermodule/store/myOrderMiddleware';
import { FCM_TOKEN, GEO_LOCATION } from './localStoreConstants';

export const handleNotification = message => {
  PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotification({
    channelId: 'fcm_fallback_notification_channel',
    title: message.notification.title,
    message: '',
    userInfo: {
      route: message.data && message.data.route,
      booking_id: message.data && message.data.booking_id,
    },
    bigText: message.notification.body,
  });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
}

export const checkLocationUser = async () => {
  const navigation = useNavigation();
  try {
    let geoLocation = await AsyncStorage.getItem(GEO_LOCATION);

    if (geoLocation) {
      geoLocation = JSON.parse(geoLocation);
      if (geoLocation) {
        navigation.navigate(routesPath.LOGIN_SCREEN);
      } else {
        navigation.navigate(routesPath.MAP_VIEW_SCREEN);
      }
    } else {
      navigation.navigate(routesPath.MAP_VIEW_SCREEN);
    }
  } catch (error) {
    navigation.navigate(routesPath.MAP_VIEW_SCREEN);
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
  // console.log('new fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log('new fcmToken', fcmToken);
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      }
    } catch (error) {
      console.log('fcmToken error:', error);
    }
  }
};

export const notificationListener = async navigation => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage && remoteMessage.data) {
      navigation.navigate(routesPath.ALL_SCREEN, {
        screen: remoteMessage?.data?.route,
        params: {orderId: remoteMessage?.data?.booking_id},
      });
    }
  });
  messaging().onMessage(async remoteMessage => {
    handleNotification(remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(res => {
      if (res && res.data) {
        navigation.navigate(routesPath.ALL_SCREEN, {
          screen: res.data?.route,
          params: {orderId: res.data?.booking_id},
        });
      }
    });
};

export const localNotificationNavigate = (navigation, dispatch) => {
  PushNotification.configure({
    onNotification: function (notification) {
      if (notification && notification.userInteraction) {
        navigation.navigate(routesPath.ALL_SCREEN, {
          screen: notification.data?.route,
          params: {orderId: notification.data?.booking_id},
        });
      } else if (
        navigationRef.current.getCurrentRoute().name === 'MyOrderScreen' &&
        notification &&
        notification.userInteraction === false
      ) {
        dispatch(getUpComingOrderMiddleWare());
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
  });
};
