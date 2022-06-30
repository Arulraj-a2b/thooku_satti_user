import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../modules/homemodule/HomeScreen';
import HotelListViewScreen from '../modules/hotelviewmodule/HotelListViewScreen';
import {routesPath} from '../routes/routesPath';
import {WHITE} from '../uikit/UikitUtils/colors';
import Header from './Header';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        contentStyle: {
          backgroundColor: WHITE,
        },
        headerShown: false,
      }}
      initialRouteName={routesPath.HOME_SCREEN}>
      <Stack.Screen name={routesPath.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
