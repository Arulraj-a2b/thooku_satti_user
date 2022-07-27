import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {getRestaurantListMiddleWare} from '../modules/homemodule/store/homeMiddleware';
import {getCartDetailsMiddleWare} from '../modules/hotelviewmodule/store/hotelListViewMiddleware';
import {calculateLocationDistanceMiddleWare} from '../modules/loginmodule/store/loginScreenMiddleware';
import {routesPath} from '../routes/routesPath';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/';

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      // console.log('userData',userData);
      let geoLocation = await AsyncStorage.getItem('geoLocationDone');
      userData = JSON.parse(userData);
      geoLocation = JSON.parse(geoLocation);
      if (geoLocation) {
        if (userData.loggedIn) {
          axios.defaults.headers.common['token'] = userData.SessionID;
          dispatch(
            calculateLocationDistanceMiddleWare({
              Latitude: geoLocation.latitude,
              Longtitude: geoLocation.longitude,
            }),
          ).then(res => {
            if (res.payload && res.payload[0]) {
              dispatch(
                getRestaurantListMiddleWare({
                  LocationID: res.payload[0].LocationID,
                }),
              ).then(() => {
                setTimeout(() => {
                  SplashScreen.hide();
                  setLoader(false);
                  navigation.navigate(routesPath.ALL_SCREEN);
                }, 1000);
              });
            }
          });
          dispatch(getCartDetailsMiddleWare());
        } else {
          setLoader(false);
          navigation.navigate(routesPath.MAP_VIEW_SCREEN);
          SplashScreen.hide();
        }
      } else {
        setLoader(false);
        navigation.navigate(routesPath.MAP_VIEW_SCREEN);
        SplashScreen.hide();
      }
    } catch (error) {
      setLoader(false);
      navigation.navigate(routesPath.MAP_VIEW_SCREEN);
      SplashScreen.hide();
    }
  };
  useEffect(() => {
    authUser();
  }, []);
};
