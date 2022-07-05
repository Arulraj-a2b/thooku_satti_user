import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import {WHITE} from '../../uikit/UikitUtils/colors';
import CartList from './CartList';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
  },
  flatListoverAll: {
    paddingHorizontal: 20,
  },
  footerStyle: {
    marginBottom: 30,
    marginTop: 20,
  },
});

const MyCartScreen = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const {getCartDetails, isLoading} = useSelector(
    ({getCartDetailsReducers}) => {
      return {
        getCartDetails: getCartDetailsReducers.data,
        isLoading: getCartDetailsReducers.isLoading,
      };
    },
  );

  const data = useMemo(() => {
    const result =
      Array.isArray(getCartDetails) &&
      getCartDetails.length !== 0 &&
      getCartDetails[0].OrdInfo;
    return result;
  }, [getCartDetails]);

  return (
    <Flex flex={1} overrideStyle={styles.overAll}>
      {isLoading && <Loader />}
      {Array.isArray(getCartDetails) && getCartDetails.length !== 0 ? (
        <FlatList
          onEndReachedThreshold={0.1}
          style={styles.flatListoverAll}
          data={data}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => (
            <CartList item={item} userDetails={userDetails} />
          )}
          ListFooterComponent={<CartPrice getCartDetails={getCartDetails[0]} />}
          ListFooterComponentStyle={styles.footerStyle}
        />
      ) : (
        <EmptyCart />
      )}
    </Flex>
  );
};

export default MyCartScreen;
