import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesPath} from '../routes/routesPath';
import TabBarIcon from './TabBarIcon';
import SvgHome from '../icons/SvgHome';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import HomeStack from './HomeStack';
import MyCartScreen from '../modules/mycartmodule/MyCartScreen';
import SvgCart from '../icons/SvgCart';
import SvgFav from '../icons/SvgFav';
import FavouriteScreen from '../modules/favouritemodule/FavouriteScreen';
import Header from './Header';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routesPath.HOME_SCREEN}
        component={HomeStack}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={<SvgHome fill={focused ? PRIMARY : GRAY_4} />} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routesPath.MY_CART_SCREEN}
        component={MyCartScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <SvgCart
                  width={26}
                  height={26}
                  fill={focused ? PRIMARY : GRAY_4}
                />
              }
            />
          ),
          header: props => <Header props={props} isBack isMenu />,
        }}
      />
      <Tab.Screen
        name={routesPath.FAVOURITE_SCREEN}
        component={FavouriteScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              icon={
                <SvgFav
                  width={26}
                  height={26}
                  fill={focused ? PRIMARY : GRAY_4}
                />
              }
            />
          ),
          header: props => <Header props={props} isBack isMenu />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
