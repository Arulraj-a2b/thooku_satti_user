import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {getCartDetailsMiddleWare} from '../modules/hotelviewmodule/store/hotelListViewMiddleware';
import {routesPath} from '../routes/routesPath';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/';

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const dispacth = useDispatch();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let geoLocation = await AsyncStorage.getItem('geoLocationDone');
      if (geoLocation) {
        if (userData) {
          userData = JSON.parse(userData);
          if (userData.loggedIn) {
            navigation.navigate(routesPath.ALL_SCREEN);
            dispacth(getCartDetailsMiddleWare({UserID: userData.UserID}));
            setTimeout(() => {
              SplashScreen.hide();
            }, 1000);
            setLoader(false);
          } else {
            navigation.navigate(routesPath.LOGIN_SCREEN);
            setLoader(false);
            setTimeout(() => {
              SplashScreen.hide();
            }, 1000);
          }
        } else {
          navigation.navigate(routesPath.LOGIN_SCREEN);
          setLoader(false);
          setTimeout(() => {
            SplashScreen.hide();
          }, 1000);
        }
      } else {
        navigation.navigate(routesPath.GOOGLE_PLACES_SEARCH_SCREEN);
        setLoader(false);
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      }
    } catch (error) {
      navigation.navigate(routesPath.LOGIN_SCREEN);
      setLoader(false);
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
  };
  useEffect(() => {
    authUser();
  }, []);
};
