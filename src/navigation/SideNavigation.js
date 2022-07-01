import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MyOrderScreen from '../modules/myordermodule/MyOrderScreen';
import {routesPath} from '../routes/routesPath';
import MyProfileScreen from '../modules/myprofilemodule/MyProfileScreen';
import BottomTab from './BottomTab';
import DrawerContent from './DrawerContent';
import Header from './Header';
import AddressScreen from '../modules/addressmodule/AddressScreen';

const Drawer = createDrawerNavigator();

const SideNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{drawerPosition: 'right', swipeEnabled: false}}
      initialRouteName="BottomTab">
      <Drawer.Screen
        options={{
          // header: props => <Header isLocation props={props} isBack isMenu />,
          headerShown: false,
        }}
        name="BottomTab"
        component={BottomTab}
      />
      <Drawer.Screen
        options={{header: props => <Header props={props} isMenu />}}
        name={routesPath.MY_ORDER_SCREEN}
        component={MyOrderScreen}
      />
      <Drawer.Screen
        options={{header: props => <Header props={props} isMenu />}}
        name={routesPath.MY_PROFILE_SCREEN}
        component={MyProfileScreen}
      />
      <Drawer.Screen
        options={{header: props => <Header props={props} isMenu />}}
        name={routesPath.ADDRESS_SCREEN}
        component={AddressScreen}
      />
    </Drawer.Navigator>
  );
};

export default SideNavigation;
