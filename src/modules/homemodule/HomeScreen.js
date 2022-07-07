import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {getRestaurantListMiddleWare} from './store/homeMiddleware';
import HotelList from './HotelList';
import HomePlaceHolder from './HomePlaceHolder';
import ReplaceModal from './ReplaceModal';

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
  const [isSelectHotelName, setSelectHotelName] = useState({name: '', id: ''});
  const [isCheckCart, setCheckCart] = useState(false);

  useEffect(() => {
    dispacth(getRestaurantListMiddleWare({LocationID: '1'}));
  }, []);

  const {isLoading, data, getCartDetails, checkCartLoading} = useSelector(
    ({
      getRestaurantListReducers,
      getCartDetailsReducers,
      checkCartExistReducers,
    }) => {
      return {
        isLoading: getRestaurantListReducers.isLoading,
        data: getRestaurantListReducers.data,
        getCartDetails: getCartDetailsReducers.data,
        checkCartLoading: checkCartExistReducers.isLoading,
      };
    },
  );

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

  if (isLoading) {
    return <HomePlaceHolder />;
  }
  return (
    <Flex overrideStyle={styles.overAll}>
      {checkCartLoading && <Loader />}
      {getCartDetails.length !== 0 && (
        <ReplaceModal
          open={isCheckCart}
          getCartDetails={getCartDetails}
          isSelectHotelName={isSelectHotelName}
          close={() => setCheckCart(false)}
          navigation={navigation}
        />
      )}
      {!isLoading && (
        <HotelList
          isSearch={isSearch}
          handleSearch={handleSearch}
          data={isAll ? results : inputSearchCheck ? data.slice(0, 5) : results}
          handleViewAll={handleViewAll}
          isAll={isAll && inputSearchCheck}
          getCartDetails={getCartDetails}
          setSelectHotelName={setSelectHotelName}
          setCheckCart={setCheckCart}
        />
      )}
    </Flex>
  );
};

export default HomeScreen;
