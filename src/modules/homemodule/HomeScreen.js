import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {getRestaurantListMiddleWare} from './store/homeMiddleware';
import HotelList from './HotelList';
import Button from '../../uikit/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
});

const HomeScreen = ({navigation}) => {
  const dispacth = useDispatch();
  const [isAll, setAll] = useState(false);
  const [isSearch, setSearch] = useState('');
  useEffect(() => {
    dispacth(getRestaurantListMiddleWare({LocationID: '1'}));
  }, []);

  const {isLoading, data} = useSelector(({getRestaurantListReducers}) => {
    return {
      isLoading: getRestaurantListReducers.isLoading,
      data: getRestaurantListReducers.data,
    };
  });

  const handleViewAll = () => {
    setAll(true);
    handleSearch('');
  };

  const handleSearch = value => {
    setSearch(value);
  };

  const results = data.filter(option =>
    option.HotelName.toLowerCase().includes(isSearch.toLowerCase()),
  );
  const inputSearchCheck = isSearch.length === 0;

  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('LoginScreen');
  };
  return (
    <>
      {isLoading && <Loader />}
      <Flex overrideStyle={styles.overAll}>
        <Button onClick={logout}>Log Out</Button>
        {!isLoading && (
          <HotelList
            isSearch={isSearch}
            handleSearch={handleSearch}
            data={
              isAll ? results : inputSearchCheck ? data.slice(0, 5) : results
            }
            handleViewAll={handleViewAll}
            isAll={isAll && inputSearchCheck}
          />
        )}
      </Flex>
    </>
  );
};

export default HomeScreen;
