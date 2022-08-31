import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import Flex from '../../uikit/Flex/Flex';
import {SUCCESS, WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import Text from '../../uikit/Text/Text';
import {INDIAN_RUPEE} from '../../uikit/UikitUtils/constants';
import {routesPath} from '../../routes/routesPath';
import Card from '../../uikit/Card/Card';
import {isFinancial} from '../../uikit/UikitUtils/helpers';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import ViewListScreen from './ViewListScreen';
import {
  getCategoryListMiddleWare,
  getFoodItemsMiddleWare,
} from './store/hotelListViewMiddleware';
import FilterModal from './FilterModal';
import {CART_DATA} from '../../utils/localStoreConstants';
import {updateCartData} from '../mycartmodule/store/myCartReducer';

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
  const [isCartData, setCardData] = useState([]);
  const flatListRef = useRef();

  useEffect(() => {
    setLoader(true);
    if (routes && routes.params) {
      dispacth(getFoodItemsMiddleWare({HotelID: routes.params.hotelId})).then(
        () => {
          getCartDetail();
        },
      );
      dispacth(getCategoryListMiddleWare({HotelID: routes.params.hotelId}));
    }
  }, []);

  const getCartDetail = async () => {
    await AsyncStorage.getItem(CART_DATA).then(res => {
      setCardData(JSON.parse(res));
      setLoader(false);
    });
  };

  const {data, categoryList, getCartData} = useSelector(
    ({getFoodItemsReducers, getCategoryListReducers, getCartDataReducers}) => {
      return {
        data: getFoodItemsReducers.data,
        categoryList: getCategoryListReducers.data,
        getCartData: getCartDataReducers.data,
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

  const handleAddCart = (item, qty) => {
    if (Array.isArray(isCartData) && isCartData.length !== 0) {
      const updatedOSArray = isCartData.map(list =>
        list?.HotelID === item.HotelID && list?.FoodID === item.FoodID
          ? {...list, qty, HotelName: routes.params?.hotelName}
          : list,
      );

      const elementIndex = isCartData.findIndex(
        obj => obj?.HotelID === item.HotelID && obj?.FoodID === item.FoodID,
      );

      if (elementIndex === -1) {
        setCardData(pre => [
          ...pre,
          {...item, qty, HotelName: routes.params?.hotelName},
        ]);
      } else {
        setCardData(updatedOSArray);
      }
    } else {
      setCardData([{...item, qty, HotelName: routes.params?.hotelName}]);
    }
  };

  const handleViewcart = () => {
    navigation.navigate(routesPath.MY_CART_SCREEN);
  };

  const results = data.filter(
    option => option.CategoryName.toLowerCase() === isFilter.toLowerCase(),
  );

  const finalFilter = isEmpty(isFilter) ? data : results;

  const filterArr = useMemo(() => {
    const result =
      isCartData &&
      isCartData?.filter(object => {
        return object.qty !== 0;
      });
    return result;
  }, [isCartData]);

  const getTotal = filterArr?.reduce((accumulator, value) => {
    return (accumulator + (value.Price * value.qty));
  }, 0);

  useEffect(() => {
    if (Array.isArray(isCartData) && isCartData.length !== 0) {
      AsyncStorage.setItem(CART_DATA, JSON.stringify(filterArr));
      dispacth(updateCartData(filterArr));
    }
  }, [filterArr]);

  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('tabPress', e => {
      e.preventDefault();
      navigation.navigate(routesPath.HOME_SCREEN);
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoader) {
    return <HomePlaceHolder />;
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
        isCartDataDetails={getCartData}
      />

      {Array.isArray(filterArr) && filterArr.length !== 0 && (
        <TouchableOpacity activeOpacity={1} onPress={handleViewcart}>
          <Card overrideStyle={styles.footerContainer}>
            <Flex row center between>
              <Flex>
                <Text color="white" bold>
                  {filterArr.length} ITEM
                </Text>
                <Text color="white" bold overrideStyle={styles.rupeeStyle}>
                  {INDIAN_RUPEE} {isFinancial(getTotal)}
                </Text>
              </Flex>
              <Text bold size={18} color="white">
                View Cart
              </Text>
            </Flex>
          </Card>
        </TouchableOpacity>
      )}
    </Flex>
  );
};

export default HotelListViewScreen;
