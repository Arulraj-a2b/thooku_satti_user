import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MyOrderScreen from '../modules/myordermodule/MyOrderScreen';
import {routesPath} from '../routes/routesPath';
import MyProfileScreen from '../modules/myprofilemodule/MyProfileScreen';
import BottomTab from './BottomTab';
import DrawerContent from './DrawerContent';
import Header from './Header';
import AddressScreen from '../modules/addressmodule/AddressScreen';
import OrderDetailsScreen from '../modules/myordermodule/OrderDetailsScreen';
import TableBookingScreen from '../modules/bookingmodule/TableBookingScreen';
import AboutScreen from '../modules/aboutmodule/AboutScreen';
import DiningViewDetailsScreen from '../modules/myordermodule/DiningViewDetailsScreen';
import PrivacyScreen from '../modules/privacymodule/PrivacyScreen';

const Drawer = createDrawerNavigator();

const SideNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{drawerPosition: 'right'}}
      initialRouteName="BottomTab">
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTab"
        component={BottomTab}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header backPath={routesPath.HOME_SCREEN} props={props} isMenu />
          ),
        }}
        name={routesPath.MY_ORDER_SCREEN}
        component={MyOrderScreen}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header backPath={routesPath.HOME_SCREEN} props={props} isMenu />
          ),
        }}
        name={routesPath.MY_PROFILE_SCREEN}
        component={MyProfileScreen}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header backPath={routesPath.HOME_SCREEN} props={props} isMenu />
          ),
        }}
        name={routesPath.ADDRESS_SCREEN}
        component={AddressScreen}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header
              backPath={routesPath.MY_ORDER_SCREEN}
              props={props}
              isMenu
            />
          ),
        }}
        name={routesPath.ORDER_DETAILS_SCREEN}
        component={OrderDetailsScreen}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header backPath={routesPath.HOME_SCREEN} props={props} isMenu />
          ),
        }}
        name={routesPath.BOOKING_TABLE_SCREEN}
        component={TableBookingScreen}
      />
      <Drawer.Screen
        options={{
          header: props => (
            <Header backPath={routesPath.HOME_SCREEN} props={props} isMenu />
          ),
        }}
        name={routesPath.ABOUT_SCREEN}
        component={AboutScreen}
      />
      <Drawer.Screen
        name={routesPath.DINING_VIEW_DEAILS_SCREEN}
        component={DiningViewDetailsScreen}
        options={() => ({
          title: '',
          header: props => <Header props={props} />,
        })}
      />
      <Drawer.Screen
        name={routesPath.PRIVACY_SCREEN}
        component={PrivacyScreen}
        options={() => ({
          title: '',
          header: props => (
            <Header props={props} backPath={routesPath.HOME_SCREEN} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default SideNavigation;
