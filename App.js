import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {useNetInfo} from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import {RootSiblingParent} from 'react-native-root-siblings';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store';
import AppLayout from './src/navigation/AppLayout';
import {requestUserPermission} from './src/utility/notificationService';
import OfflineScreen from './src/modules/offlinemodule/OfflineScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    AsyncStorage.removeItem('geoLocationDone');
    requestUserPermission();
    requestLocationPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  async function requestLocationPermission() {
    var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (res === 'granted') {
      await Geolocation.getCurrentPosition(
        ({coords}) => {
          AsyncStorage.setItem('geoLocation', JSON.stringify(coords));
        },
        _error => {
          // Alert.alert(error.code,error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }

  const netInfo = useNetInfo();

  return netInfo.isConnected || netInfo.isConnected === null ? (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={store}>
          <NavigationContainer>
            <AppLayout />
          </NavigationContainer>
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  ) : (
    <SafeAreaProvider>
      <OfflineScreen />
    </SafeAreaProvider>
  );
};

export default App;
