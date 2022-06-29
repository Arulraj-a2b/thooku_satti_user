import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {routesPath, stacks} from '../routes/routesPath';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/';

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = setLoader => {
  const navigation = useNavigation();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let geoLocation = await AsyncStorage.getItem('geoLocationDone');
      if (geoLocation) {
        if (userData) {
          userData = JSON.parse(userData);
          if (userData.loggedIn) {
            navigation.navigate(stacks.HomeStack);
            setTimeout(() => {
              SplashScreen.hide();
            }, 1000);
            setLoader(false);
          } else {
            navigation.navigate('LoginScreen');
            setLoader(false);
            setTimeout(() => {
              SplashScreen.hide();
            }, 1000);
          }
        }
      } else {
        navigation.navigate(routesPath.MAP_VIEW_SCREEN);
        setLoader(false);
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      }
    } catch (error) {
      navigation.navigate('LoginScreen');
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
