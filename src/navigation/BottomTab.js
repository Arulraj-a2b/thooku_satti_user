import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {routesPath, stacks} from '../routes/routesPath';
import TabBarIcon from './TabBarIcon';
import SvgHome from '../icons/SvgHome';
import {GRAY_4, PRIMARY} from '../uikit/UikitUtils/colors';
import HomeStack from './HomeStack';
import MyCartScreen from '../modules/mycartmodule/MyCartScreen';
import Header from './Header';
import CartIcon from './CartIcon';
import {CART_DATA, USER_DATA} from '../utils/localStoreConstants';
import {updateCartData} from '../modules/mycartmodule/store/myCartReducer';
import {updateUserData} from '../modules/loginmodule/store/loginReducer';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const dispacth = useDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  const {getRestaurantList, getCartData, getUser} = useSelector(
    ({getRestaurantListReducers, getCartDataReducers, getUserDataReducers}) => {
      return {
        getRestaurantList: getRestaurantListReducers.data,
        getCartData: getCartDataReducers.data,
        getUser: getUserDataReducers.data,
      };
    },
  );
  const getCartCount = Array.isArray(getCartData) ? getCartData.length : '';

  const getUserData = async () => {
    await AsyncStorage.getItem(USER_DATA).then(res => {
      dispacth(updateUserData(JSON.parse(res)));
    });
    await AsyncStorage.getItem(CART_DATA).then(res => {
      dispacth(updateCartData(JSON.parse(res)));
    });
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
      {getUser && getUser?.Message === 'Success' && (
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
