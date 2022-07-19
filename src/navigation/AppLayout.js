import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  checkLocationUser,
  notificationListener,
  localNotificationNavigate,
} from '../utility/notificationService';
import MainNavigator from './MainNavigator';

const AppLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  checkLocationUser();
  localNotificationNavigate(navigation, dispatch);
  useEffect(() => {
    notificationListener(navigation);
  }, []);

  return <MainNavigator />;
};

export default AppLayout;
