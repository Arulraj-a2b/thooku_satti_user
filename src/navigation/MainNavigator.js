import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../modules/homemodule/HomeScreen';
import LoginScreen from '../modules/loginmodule/LoginScreen';
import RegisterScreen from '../modules/registermodule/RegisterScreen';

const LoginStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{}} initialRouteName={'RegisterScreen'}>
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
      <LoginStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: true}}
      />
    </LoginStack.Navigator>
  );
};

export default MainNavigator;
