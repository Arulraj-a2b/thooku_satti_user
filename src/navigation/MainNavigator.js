import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../modules/forgotpasswordmodule/ForgotPasswordScreen';
import HomeScreen from '../modules/homemodule/HomeScreen';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import RegisterScreen from '../modules/registermodule/RegisterScreen';
import {routesPath} from '../routes/routesPath';

const LoginStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{}}
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
        options={{headerShown: true}}
      />
      <LoginStack.Screen
        name={routesPath.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={{headerShown: true}}
      />
    </LoginStack.Navigator>
  );
};

export default MainNavigator;
