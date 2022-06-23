import {useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { notificationListener } from '../utility/notificationService';
import MainNavigator from './MainNavigator';

const AppLayout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    notificationListener(navigation);
  }, []);
  return <MainNavigator />;
};

export default AppLayout;
