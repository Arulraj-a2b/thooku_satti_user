import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesPath, stacks} from '../routes/routesPath';
import TabBarIcon from './TabBarIcon';
import SvgHome from '../icons/SvgHome';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import HomeStack from './HomeStack';
import MyCartScreen from '../modules/mycartmodule/MyCartScreen';
import Header from './Header';
import CartIcon from './CartIcon';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {getCartDetails, getRestaurantList} = useSelector(
    ({getCartDetailsReducers, getRestaurantListReducers}) => {
      return {
        getCartDetails: getCartDetailsReducers.data,
        getRestaurantList: getRestaurantListReducers.data,
      };
    },
  );

  const getCartCount =
    getCartDetails &&
    getCartDetails.length !== 0 &&
    getCartDetails[0].CartCount;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={stacks.HomeStack}
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
                <CartIcon
                  focused={focused}
                  isCount={
                    Array.isArray(getRestaurantList) &&
                    getRestaurantList.length !== 0
                  }
                  count={getCartCount}
                />
              }
            />
          ),
          header: props => <Header props={props} isBack isMenu />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
