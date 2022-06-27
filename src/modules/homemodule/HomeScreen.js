import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {getRestaurantListMiddleWare} from './store/homeMiddleware';
import HotelList from './HotelList';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
});
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getRestaurantListMiddleWare({LocationID: '1'}));
  }, []);

  const {isLoading, data} = useSelector(({getRestaurantListReducers}) => {
    return {
      isLoading: getRestaurantListReducers.isLoading,
      data: getRestaurantListReducers.data,
    };
  });

  const logout = () => {
    AsyncStorage.setItem('userData', JSON.stringify({}));
    navigation.navigate('LoginScreen');
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex overrideStyle={styles.overAll}>
        <HotelList data={data} />
      </Flex>
    </>
  );
};

export default HomeScreen;
