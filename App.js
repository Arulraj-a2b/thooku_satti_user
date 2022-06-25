import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store';
import AppLayout from './src/navigation/AppLayout';
import {requestUserPermission} from './src/utility/notificationService';
import OfflineScreen from './src/modules/offlinemodule/OfflineScreen';
// import Logger, {startNetworkLogging} from 'react-native-network-logger';
// import {TouchableOpacity} from 'react-native';
// import Text from './src/uikit/Text/Text';

const App = () => {
  // const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    // startNetworkLogging();
    requestUserPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const netInfo = useNetInfo();
  // const handleToggleLogger = () => setShowLogger(!showLogger);

  return netInfo.isConnected || netInfo.isConnected === null ? (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          {/* {
            <TouchableOpacity onPress={handleToggleLogger}>
              <Text color={'link'}>
                {showLogger ? 'Hide Logger' : 'Show Logger'}
              </Text>
            </TouchableOpacity>
          }
          {showLogger ? <Logger /> : <AppLayout />} */}
          <AppLayout />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  ) : (
    <SafeAreaProvider>
      <OfflineScreen />
    </SafeAreaProvider>
  );
};

export default App;
