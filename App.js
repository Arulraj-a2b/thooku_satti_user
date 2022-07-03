import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {RootSiblingParent} from 'react-native-root-siblings';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store';
import AppLayout from './src/navigation/AppLayout';
import {requestUserPermission} from './src/utility/notificationService';
import OfflineScreen from './src/modules/offlinemodule/OfflineScreen';
import Logger, {startNetworkLogging} from 'react-native-network-logger';
import Text from './src/uikit/Text/Text';

const App = () => {
  const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    startNetworkLogging();
    // AsyncStorage.removeItem('geoLocationDone');
    requestUserPermission();
  }, []);

  const handleToggleLogger = () => setShowLogger(!showLogger);

  const netInfo = useNetInfo();
  const isProd = true;
  return netInfo.isConnected || netInfo.isConnected === null ? (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={store}>
          <NavigationContainer>
            {isProd ? (
              <AppLayout />
            ) : (
              <>
                {
                  <TouchableOpacity onPress={handleToggleLogger}>
                    <Text color={'link'}>
                      {showLogger ? 'Hide Logger' : 'Show Logger'}
                    </Text>
                  </TouchableOpacity>
                }
                {showLogger ? <Logger /> : <AppLayout />}
              </>
            )}
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
