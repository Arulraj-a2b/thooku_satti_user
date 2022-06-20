import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import RegisterScreen from '../modules/registermodule/RegisterScreen';

const LoginStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{}} initialRouteName={'LoginScreen'}>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  );
};

export default MainNavigator;
