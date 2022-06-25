import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {stacks} from '../routes/routesPath';

export const BASE_URL = 'https://foodapp.appsure.co.in/api/';

export const fetchUrl = url => {
  const result = `${BASE_URL}${url}`;
  return result;
};

export const useAuthCheck = () => {
  const navigation = useNavigation();
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);

        if (userData.loggedIn) {
          navigation.navigate(stacks.HomeStack);
        } else {
          navigation.navigate('LoginScreen');
        }
      } else {
      }
    } catch (error) {
      navigation.navigate('LoginScreen');
    }
  };
  useEffect(() => {
    authUser();
  });
};
