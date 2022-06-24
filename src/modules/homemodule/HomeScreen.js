import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Button from '../../uikit/Button/Button';
// import Text from '../../uikit/Text/Text';

const HomeScreen = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.setItem('userData', JSON.stringify({}));
    navigation.navigate('LoginScreen');
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default HomeScreen;
