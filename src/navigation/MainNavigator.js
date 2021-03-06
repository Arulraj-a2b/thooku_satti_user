import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatePasswordScreen from '../modules/forgotpasswordmodule/CreatePasswordScreen';
import CreatePasswordSuccss from '../modules/forgotpasswordmodule/CreatePasswordSuccss';
import ForgotPasswordScreen from '../modules/forgotpasswordmodule/ForgotPasswordScreen';
import ForgotPasswordVerifyScreen from '../modules/forgotpasswordmodule/ForgotPasswordVerifyScreen';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import GooglePlacesSearchScreen from '../modules/mapmodule/GooglePlacesSearchScreen';
import MapView from '../modules/mapmodule/MapView';
import RegisterScreen from '../modules/registermodule/RegisterScreen';
import {routesPath} from '../routes/routesPath';
import {WHITE} from '../uikit/UikitUtils/colors';
import Header from './Header';
import SideNavigation from './SideNavigation';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesPath.LOGIN_SCREEN}
      screenOptions={{
        headerMode: 'screen',
        contentStyle: {
          backgroundColor: WHITE,
        },
      }}>
      <Stack.Screen
        name={routesPath.LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={routesPath.MAP_VIEW_SCREEN}
        component={MapView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routesPath.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={routesPath.ALL_SCREEN}
        component={SideNavigation}
      />
      <Stack.Screen
        name={routesPath.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <Stack.Screen
        name={routesPath.FORGOT_PASSWORD_VERIFY_SCREEN}
        component={ForgotPasswordVerifyScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <Stack.Screen
        name={routesPath.CREATE_PASSWORD_SCREEN}
        component={CreatePasswordScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <Stack.Screen
        name={routesPath.CREATE_PASSWORD_SUCCESS}
        component={CreatePasswordSuccss}
        options={() => ({
          title: '',
          header: props => <Header props={props} isBack />,
        })}
      />
      <Stack.Screen
        name={routesPath.GOOGLE_PLACES_SEARCH_SCREEN}
        component={GooglePlacesSearchScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
