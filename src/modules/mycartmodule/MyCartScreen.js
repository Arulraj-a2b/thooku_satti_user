import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, Keyboard, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {CART_DATA} from '../../utils/localStoreConstants';
import CartList from './CartList';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
import MyCartFooter from './MyCartFooter';
import OrderSuccessModal from './OrderSuccessModal';
import {checkOutMiddleWare, getTNCSMiddleWare} from './store/myCartMiddleware';
import {updateCartData} from './store/myCartReducer';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
  },
  flatListoverAll: {
    paddingHorizontal: 20,
  },
  footerStyle: {
    marginTop: 20,
    paddingBottom: 50,
  },
  listHeaderComponentStyle: {
    paddingVertical: 16,
    backgroundColor: WHITE,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
});

const MyCartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isSuccess, setSuccess] = useState(false);
  const listViewRef = createRef();
  const [isCartData, setCardData] = useState([]);

  useEffect(() => {
    dispatch(getTNCSMiddleWare());
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (listViewRef && listViewRef.current) {
        listViewRef.current.scrollToOffset({animated: true, offset: 0});
      }
    }, []),
  );

  const {
    checkOutData,
    isCheckoutLoader,
    getTNCData,
    getCartData,
    getUser,
    locationID,
  } = useSelector(
    ({
      checkOutReducers,
      getTNCReducers,
      getCartDataReducers,
      getUserDataReducers,
      calculateLocationDistanceReducers,
    }) => {
      return {
        checkOutData: checkOutReducers.data,
        isCheckoutLoader: checkOutReducers.isLoading,
        getTNCData: getTNCReducers.data,
        getCartData: getCartDataReducers.data,
        getUser: getUserDataReducers.data,
        locationID: calculateLocationDistanceReducers.data[0],
      };
    },
  );

  useEffect(() => {
    setCardData(getCartData);
  }, []);

  const downButtonHandler = () => {
    listViewRef.current.scrollToIndex({
      index: Array(getCartData) && getCartData.length - 1,
      animated: true,
    });
  };

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.address)) {
      errors.address = 'Address field is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {notes: '', address: ''},
    onSubmit: value => handleCheckOut(value),
    validate: handleValidate,
  });

  const handleCheckOut = value => {
    Keyboard.dismiss();
    dispatch(
      checkOutMiddleWare({
        ExtraNotes: value.notes,
        DeliveryAddress: value.address,
      }),
    ).then(res => {
      if (res.payload && res.payload[0].OrderID) {
        setSuccess(true);
        formik.resetForm();
        dispatch(updateCartData());
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (getUser) {
        formik.setFieldValue('address', getUser?.DeliveryAddress);
      }
    }, [getCartData]),
  );

  const getTotal = getCartData?.reduce((accumulator, value) => {
    return accumulator + value.Price * value.qty;
  }, 0);
  const deliveryCost = getUser?.DeliveryCharge;
  const grandTotal = Number(getTotal) + Number(deliveryCost);

  const handleAddCart = (item, qty) => {
    if (Array.isArray(getCartData) && getCartData.length !== 0) {
      const updatedArray = getCartData.map(list =>
        list?.HotelID === item.HotelID && list?.FoodID === item.FoodID
          ? {...list, qty}
          : list,
      );
      const elementIndex = isCartData.findIndex(
        obj => obj?.HotelID === item.HotelID && obj?.FoodID === item.FoodID,
      );
      if (elementIndex === -1) {
        setCardData(pre => [...pre, {...item, qty}]);
      } else {
        setCardData(updatedArray);
      }
    }
  };

  const filterArr = useMemo(() => {
    const result =
      isCartData &&
      isCartData?.filter(object => {
        return object.qty !== 0;
      });
    return result;
  }, [isCartData]);

  useEffect(() => {
    if (Array.isArray(isCartData) && isCartData.length !== 0) {
      AsyncStorage.setItem(CART_DATA, JSON.stringify(filterArr));
      dispatch(updateCartData(filterArr));
    }
  }, [filterArr]);

  return (
    <Flex flex={1} overrideStyle={[styles.overAll]}>
      <OrderSuccessModal
        open={isSuccess}
        close={() => setSuccess(false)}
        navigation={navigation}
        checkOutData={checkOutData}
      />
      {isCheckoutLoader && <Loader />}
      {locationID.LocationID !== 0 &&
      Array.isArray(getCartData) &&
      getCartData?.length !== 0 ? (
        <Flex between flex={1}>
          <FlatList
            ListHeaderComponentStyle={styles.listHeaderComponentStyle}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <Text size={22} bold>
                {getCartData && getCartData[0].HotelName}
              </Text>
            }
            ref={listViewRef}
            onEndReachedThreshold={0.1}
            style={styles.flatListoverAll}
            data={getCartData}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item}) => (
              <CartList item={item} handleAddCart={handleAddCart} />
            )}
            ListFooterComponent={
              <CartPrice
                getTNCData={getTNCData}
                getCartDetails={getCartData}
                formik={formik}
                getTotal={getTotal}
                deliveryCost={deliveryCost}
                grandTotal={grandTotal}
              />
            }
            ListFooterComponentStyle={styles.footerStyle}
          />
          <MyCartFooter
            downButtonHandler={downButtonHandler}
            handleSubmit={formik.handleSubmit}
            grandTotal={grandTotal}
          />
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </Flex>
  );
};

export default MyCartScreen;
