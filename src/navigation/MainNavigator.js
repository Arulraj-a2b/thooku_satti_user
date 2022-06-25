import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CreatePasswordScreen from '../modules/forgotpasswordmodule/CreatePasswordScreen';
import CreatePasswordSuccss from '../modules/forgotpasswordmodule/CreatePasswordSuccss';
import ForgotPasswordScreen from '../modules/forgotpasswordmodule/ForgotPasswordScreen';
import ForgotPasswordVerifyScreen from '../modules/forgotpasswordmodule/ForgotPasswordVerifyScreen';
import HomeScreen from '../modules/homemodule/HomeScreen';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import RegisterScreen from '../modules/registermodule/RegisterScreen';
import {routesPath} from '../routes/routesPath';
import {WHITE} from '../uikit/UikitUtils/colors';
import Header from './Header';

const LoginStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        contentStyle: {
          backgroundColor: WHITE,
        },
      }}
      initialRouteName={routesPath.LOGIN_SCREEN}>
      <LoginStack.Screen
        name={routesPath.LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={routesPath.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name={routesPath.HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: true, headerBackVisible: false}}
      />
      <LoginStack.Screen
        name={routesPath.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <LoginStack.Screen
        name={routesPath.FORGOT_PASSWORD_VERIFY_SCREEN}
        component={ForgotPasswordVerifyScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <LoginStack.Screen
        name={routesPath.CREATE_PASSWORD_SCREEN}
        component={CreatePasswordScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <LoginStack.Screen
        name={routesPath.CREATE_PASSWORD_SUCCESS}
        component={CreatePasswordSuccss}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
    </LoginStack.Navigator>
  );
};

export default MainNavigator;
