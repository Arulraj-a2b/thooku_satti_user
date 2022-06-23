import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import store from './store';
import AppLayout from './src/navigation/AppLayout';
import {requestUserPermission} from './src/utility/notificationService';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const netInfo = useNetInfo();

  return netInfo.isConnected || netInfo.isConnected === null ? (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppLayout />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  ) : (
    <SafeAreaProvider>
      <Text>off</Text>
    </SafeAreaProvider>
  );
};

export default App;
