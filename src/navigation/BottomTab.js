import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from '../uikit/UikitUtils/validators';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const [userDetails, setUserDetails] = useState();

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

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

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
      {!isEmpty(userDetails) && (
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
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
