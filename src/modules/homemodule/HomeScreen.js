import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import HotelList from './HotelList';
import HomePlaceHolder from './HomePlaceHolder';
import ReplaceModal from './ReplaceModal';
import Text from '../../uikit/Text/Text';
import {getRestaurantListMiddleWare} from './store/homeMiddleware';
import {useRoute} from '@react-navigation/native';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  emptyText: {
    width: 300,
    lineHeight: 22,
  },
});

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [isAll, setAll] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isSelectHotelName, setSelectHotelName] = useState({name: '', id: ''});
  const [isCheckCart, setCheckCart] = useState(false);

  const {isLoading, data, calculateLoading, locationID, getCartData} =
    useSelector(
      ({
        getRestaurantListReducers,
        calculateLocationDistanceReducers,
        getCartDataReducers,
      }) => {
        return {
          isLoading: getRestaurantListReducers.isLoading,
          data: getRestaurantListReducers.data,
          calculateLoading: calculateLocationDistanceReducers.isLoading,
          locationID: calculateLocationDistanceReducers.data[0],
          getCartData: getCartDataReducers.data,
        };
      },
    );

  useEffect(() => {
    dispatch(
      getRestaurantListMiddleWare({
        LocationID: locationID.LocationID,
        SearchText: route.params?.search ? route.params?.search : '',
        Type: route.params?.type ? route.params?.type : '',
      }),
    );
  }, []);

  const handleViewAll = () => {
    setAll(true);
    handleSearch('');
    if (isEmpty(route.params?.search)) {
      dispatch(
        getRestaurantListMiddleWare({
          LocationID: locationID.LocationID,
          Type: route.params?.type ? route.params?.type : '',
        }),
      );
    }
  };

  const handleSearch = value => {
    setSearch(value);
  };

  const results = data.filter(option =>
    option.HotelName.toLowerCase().includes(isSearch.toLowerCase()),
  );

  const inputSearchCheck = isSearch.length === 0;
  if (isLoading || calculateLoading) {
    return <HomePlaceHolder />;
  }

  return (
    <Flex overrideStyle={styles.overAll}>
      {Array.isArray(getCartData) && getCartData.length !== 0 && (
        <ReplaceModal
          open={isCheckCart}
          getCartDetails={getCartData}
          isSelectHotelName={isSelectHotelName}
          close={() => setCheckCart(false)}
          navigation={navigation}
        />
      )}
      {!isLoading && data.length !== 0 ? (
        <HotelList
          isSearch={isSearch}
          handleSearch={handleSearch}
          data={isAll ? results : inputSearchCheck ? data.slice(0, 5) : results}
          handleViewAll={handleViewAll}
          isAll={isAll && inputSearchCheck}
          getCartDetails={getCartData}
          setSelectHotelName={setSelectHotelName}
          setCheckCart={setCheckCart}
        />
      ) : (
        <Flex flex={1} center middle>
          <Text
            align={'center'}
            bold
            size={16}
            color="gray"
            overrideStyle={styles.emptyText}>
            Sorry! Restaurants are unavailable at the moment. Please revisit
            after a while.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default HomeScreen;
