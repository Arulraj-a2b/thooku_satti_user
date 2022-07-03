import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import CartList from './CartList';
import CartPrice from './CartPrice';

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

  const {getCartDetails} = useSelector(({getCartDetailsReducers}) => {
    return {
      getCartDetails: getCartDetailsReducers.data,
    };
  });

  const data = getCartDetails && getCartDetails[0].OrdInfo;

  return (
    <Flex flex={1} overrideStyle={styles.overAll}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.flatListoverAll}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item}) => (
          <CartList item={item} userDetails={userDetails} />
        )}
        ListFooterComponent={<CartPrice />}
        ListFooterComponentStyle={styles.footerStyle}
      />
    </Flex>
  );
};

export default MyCartScreen;
