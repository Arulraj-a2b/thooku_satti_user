import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flex from '../../uikit/Flex/Flex';
import {BLACK, SUCCESS, WHITE} from '../../uikit/UikitUtils/colors';
import ViewListScreen from './ViewListScreen';
import {
  addCartMiddleWare,
  getCategoryListMiddleWare,
  getFoodItemsMiddleWare,
  getCartDetailsMiddleWare,
} from './store/hotelListViewMiddleware';
import {useRoute} from '@react-navigation/native';
import Loader from '../../uikit/Loader/Loader';
import FilterModal from './FilterModal';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {routesPath} from '../../routes/routesPath';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  footerContainer: {
    backgroundColor: SUCCESS,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  rupeeStyle: {
    marginTop: 8,
  },
});

const HotelListViewScreen = ({navigation}) => {
  const dispacth = useDispatch();
  const routes = useRoute();
  const [isLoader, setLoader] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isFilter, setFilter] = useState('');
  const flatListRef = useRef();
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

  useEffect(() => {
    setLoader(true);
    if (routes && routes.params) {
      dispacth(getFoodItemsMiddleWare({HotelID: routes.params.hotelId})).then(
        () => {
          setLoader(false);
        },
      );
      dispacth(getCategoryListMiddleWare({HotelID: routes.params.hotelId}));
    }
  }, []);

  const {data, categoryList, getCartDetails} = useSelector(
    ({
      getFoodItemsReducers,
      getCategoryListReducers,
      getCartDetailsReducers,
    }) => {
      return {
        data: getFoodItemsReducers.data,
        categoryList: getCategoryListReducers.data,
        getCartDetails: getCartDetailsReducers.data,
      };
    },
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = value => {
    setFilter(value);
    setOpen(false);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const handleAddCart = (HotelID, ItemID, Qty, UserID) => {
    dispacth(
      addCartMiddleWare({
        HotelID,
        ItemID,
        Qty,
        UserID,
      }),
    ).then(() => {
      dispacth(getCartDetailsMiddleWare({UserID: userDetails?.UserID}));
    });
  };

  const handleViewcart = () => {
    navigation.navigate(routesPath.MY_CART_SCREEN);
  };

  const results = data.filter(
    option => option.CategoryName.toLowerCase() === isFilter.toLowerCase(),
  );

  const finalFilter = isEmpty(isFilter) ? data : results;
  if (isLoader) {
    return <Loader />;
  }

  return (
    <Flex overrideStyle={styles.overAll}>
      <FilterModal
        categoryList={categoryList}
        open={isOpen}
        close={handleClose}
        handleFilter={handleFilter}
        isFilter={isFilter}
        totalLength={data.length}
      />
      <ViewListScreen
        handleAddCart={handleAddCart}
        ref={flatListRef}
        data={finalFilter}
        handleOpen={handleOpen}
        userDetails={userDetails}
      />

      {Array.isArray(getCartDetails) &&
        getCartDetails.length !== 0 &&
        getCartDetails[0].CartCount !== 0 && (
          <Flex row center between overrideStyle={styles.footerContainer}>
            <Flex>
              <Text color="white" bold>
                {getCartDetails && getCartDetails[0].CartCount} ITEM
              </Text>
              <Text color="white" bold overrideStyle={styles.rupeeStyle}>
                {INDIAN_RUPEE}100
              </Text>
            </Flex>
            <TouchableOpacity onPress={handleViewcart}>
              <Text bold size={18} color="white">
                View Cart
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
    </Flex>
  );
};

export default HotelListViewScreen;
