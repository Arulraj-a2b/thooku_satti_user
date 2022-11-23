import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getHomeDashboardMiddleWare} from '../modules/homemodule/store/homeMiddleware';
import {updateUserData} from '../modules/loginmodule/store/loginReducer';
import {calculateLocationDistanceMiddleWare} from '../modules/loginmodule/store/loginScreenMiddleware';
import {updateCartData} from '../modules/mycartmodule/store/myCartReducer';
import {routesPath} from '../routes/routesPath';
import {checkVersion} from '../uikit/UikitUtils/helpers';
import {CART_DATA, GEO_LOCATION, USER_DATA} from './localStoreConstants';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/Mobapi/'; // staging
// export const BASE_URL = 'https://mobileorder.dindigulthookusatti.com/api/Mobapi/'; // production

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem(USER_DATA);
      let geoLocation = await AsyncStorage.getItem(GEO_LOCATION);
      userData = JSON.parse(userData);
      geoLocation = JSON.parse(geoLocation);
      if (geoLocation) {
        if (userData.loggedIn) {
          dispatch(updateUserData(userData));
          axios.defaults.headers.common['token'] = userData.SessionID;
          dispatch(
            calculateLocationDistanceMiddleWare({
              Latitude: geoLocation.latitude,
              Longtitude: geoLocation.longitude,
            }),
          ).then(res => {
            if (res.payload && res.payload[0]) {
              dispatch(
                getHomeDashboardMiddleWare({
                  LocationID: res.payload[0].LocationID,
                }),
              ).then(() => {
                setTimeout(() => {
                  // SplashScreen.hide();
                  setLoader(false);
                  checkVersion();
                  navigation.navigate(routesPath.ALL_SCREEN);
                }, 1000);
              });
            }
          });
          await AsyncStorage.getItem(CART_DATA).then(res => {
            dispatch(updateCartData(JSON.parse(res)));
          });
        } else {
          setLoader(false);
          checkVersion();
          navigation.navigate(routesPath.MAP_VIEW_SCREEN);
          // SplashScreen.hide();
        }
      } else {
        setLoader(false);
        checkVersion();
        navigation.navigate(routesPath.MAP_VIEW_SCREEN);
        // SplashScreen.hide();
      }
    } catch (error) {
      setLoader(false);
      checkVersion();
      navigation.navigate(routesPath.MAP_VIEW_SCREEN);
      // SplashScreen.hide();
    }
  };
  useEffect(() => {
    authUser();
  }, []);
};
