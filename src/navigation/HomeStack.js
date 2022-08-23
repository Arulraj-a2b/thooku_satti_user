import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../modules/homemodule/HomeScreen';
import MainHomeScreen from '../modules/homemodule/MainHomeScreen';
import HotelListViewScreen from '../modules/hotelviewmodule/HotelListViewScreen';
import {routesPath, stacks} from '../routes/routesPath';
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
      }}
      initialRouteName={routesPath.HOME_SCREEN}>
      <Stack.Screen
        name={routesPath.HOME_SCREEN}
        component={MainHomeScreen}
        options={{
          header: props => <Header isLocation props={props} isBack isMenu />,
        }}
      />
      <Stack.Screen
        name={routesPath.LIST_HOME_SCREEN}
        component={HomeScreen}
        options={{
          header: props => (
            <Header
              props={props}
              handleBack={() => {
                props.navigation.navigate(routesPath.ALL_SCREEN, {
                  screen: 'BottomTab',
                  params: {
                    screen: stacks.HomeStack,
                    params: {
                      screen: routesPath.HOME_SCREEN,
                    },
                  },
                });
              }}
              isMenu
            />
          ),
        }}
      />
      <Stack.Screen
        name={routesPath.HOTEL_LIST_VIEW_SCREEN}
        component={HotelListViewScreen}
        options={{
          header: props => <Header props={props} isMenu />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
