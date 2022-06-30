import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {RootSiblingParent} from 'react-native-root-siblings';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './store';
import AppLayout from './src/navigation/AppLayout';
import {requestUserPermission} from './src/utility/notificationService';
import OfflineScreen from './src/modules/offlinemodule/OfflineScreen';

const App = () => {
  // const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    // startNetworkLogging();
    // AsyncStorage.removeItem('geoLocationDone');
    requestUserPermission();
  }, []);

  // const handleToggleLogger = () => setShowLogger(!showLogger);

  const netInfo = useNetInfo();

  return netInfo.isConnected || netInfo.isConnected === null ? (
    <SafeAreaProvider>
      <RootSiblingParent>
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
      </RootSiblingParent>
    </SafeAreaProvider>
  ) : (
    <SafeAreaProvider>
      <OfflineScreen />
    </SafeAreaProvider>
  );
};

export default App;
