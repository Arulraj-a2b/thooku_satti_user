import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesPath} from '../routes/routesPath';
import TabBarIcon from './TabBarIcon';
import SvgHome from '../icons/SvgHome';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        // header: props => <Header props={props} isBack isMenu />,
        headerShown:false
      }}>
      <Tab.Screen
        name={routesPath.HOME_SCREEN}
        component={HomeStack}
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
