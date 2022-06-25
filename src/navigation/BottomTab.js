import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../modules/homemodule/HomeScreen';
import {routesPath} from '../routes/routesPath';
import Header from './Header';
import TabBarIcon from './TabBarIcon';
import SvgHome from '../icons/SvgHome';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: props => <Header props={props} isBack />,
      }}>
      <Tab.Screen
        name={routesPath.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon icon={<SvgHome fill={focused ? PRIMARY : GRAY_4} />} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
