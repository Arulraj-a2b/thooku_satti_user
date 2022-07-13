import {useFocusEffect} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import {THIS_FIELD_REQUIRED} from '../../uikit/UikitUtils/constants';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {getCartDetailsMiddleWare} from '../hotelviewmodule/store/hotelListViewMiddleware';
import CartList from './CartList';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
import MyCartFooter from './MyCartFooter';
import OrderSuccessModal from './OrderSuccessModal';
import {checkOutMiddleWare, getTNCSMiddleWare} from './store/myCartMiddleware';

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
    getCartDetails,
    isLoading,
    addCartLoader,
    checkOutData,
    isCheckoutLoader,
    getTNCData,
  } = useSelector(
    ({
      getCartDetailsReducers,
      addCartReducers,
      checkOutReducers,
      getTNCReducers,
    }) => {
      return {
        getCartDetails: getCartDetailsReducers.data,
        isLoading: getCartDetailsReducers.isLoading,
        addCartLoader: addCartReducers.isLoading,
        checkOutData: checkOutReducers.data,
        isCheckoutLoader: checkOutReducers.isLoading,
        getTNCData: getTNCReducers.data,
      };
    },
  );
  const downButtonHandler = () => {
    listViewRef.current.scrollToEnd({animated: true});
  };

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.address)) {
      errors.address = THIS_FIELD_REQUIRED;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {notes: '', address: ''},
    onSubmit: value => handleCheckOut(value),
    validate: handleValidate,
  });

  const handleCheckOut = value => {
    dispatch(checkOutMiddleWare({ExtraNotes: value.notes})).then(res => {
      if (res.payload && res.payload[0].OrderID) {
        setSuccess(true);
        formik.resetForm();
        dispatch(getCartDetailsMiddleWare());
      }
    });
  };

  return (
    <Flex
      flex={1}
      overrideStyle={[
        styles.overAll,
        {opacity: isLoading || addCartLoader ? 0.5 : 1},
      ]}>
      <OrderSuccessModal
        open={isSuccess}
        close={() => setSuccess(false)}
        navigation={navigation}
        checkOutData={checkOutData}
      />
      {isCheckoutLoader && <Loader />}
      {Array.isArray(getCartDetails) && getCartDetails.length !== 0 ? (
        <Flex between flex={1}>
          <FlatList
            ListHeaderComponentStyle={styles.listHeaderComponentStyle}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <Text size={22} bold>
                {getCartDetails && getCartDetails[0].HotelName}
              </Text>
            }
            ref={listViewRef}
            onEndReachedThreshold={0.1}
            style={styles.flatListoverAll}
            data={getCartDetails[0].OrdInfo}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item}) => <CartList item={item} />}
            ListFooterComponent={
              <CartPrice
                getTNCData={getTNCData}
                getCartDetails={getCartDetails[0]}
                formik={formik}
              />
            }
            ListFooterComponentStyle={styles.footerStyle}
          />
          <MyCartFooter
            getCartDetails={getCartDetails}
            downButtonHandler={downButtonHandler}
            handleSubmit={formik.handleSubmit}
          />
        </Flex>
      ) : (
        <EmptyCart />
      )}
    </Flex>
  );
};

export default MyCartScreen;
