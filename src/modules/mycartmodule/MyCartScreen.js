import {useFormik} from 'formik';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import {GRAY_5} from '../../uikit/UikitUtils/colors';
import CartList from './CartList';
import CartPrice from './CartPrice';
import EmptyCart from './EmptyCart';
import MyCartFooter from './MyCartFooter';
import OrderSuccessModal from './OrderSuccessModal';
import {checkOutMiddleWare} from './store/myCartMiddleware';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: GRAY_5,
  },
  flatListoverAll: {
    paddingHorizontal: 20,
  },
  footerStyle: {
    marginTop: 20,
    paddingBottom: 50,
  },
});

const MyCartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isSuccess, setSuccess] = useState(false);

  let listViewRef;

  const {
    getCartDetails,
    isLoading,
    addCartLoader,
    checkOutData,
    isCheckoutLoader,
  } = useSelector(
    ({getCartDetailsReducers, addCartReducers, checkOutReducers}) => {
      return {
        getCartDetails: getCartDetailsReducers.data,
        isLoading: getCartDetailsReducers.isLoading,
        addCartLoader: addCartReducers.isLoading,
        checkOutData: checkOutReducers.data,
        isCheckoutLoader: checkOutReducers.isLoading,
      };
    },
  );
  const downButtonHandler = () => {
    listViewRef.scrollToEnd({animated: true});
  };

  const formik = useFormik({
    initialValues: {notes: ''},
    onSubmit: value => handleCheckOut(value),
  });

  const handleCheckOut = value => {
    dispatch(checkOutMiddleWare({ExtraNotes: value.notes})).then(res => {
      if (res.payload && res.payload[0].OrderID) {
        setSuccess(true);
        formik.resetForm();
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
            ref={ref => {
              listViewRef = ref;
            }}
            onEndReachedThreshold={0.1}
            style={styles.flatListoverAll}
            data={getCartDetails[0].OrdInfo}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => (
              <CartList item={item} index={index} />
            )}
            ListFooterComponent={
              <CartPrice getCartDetails={getCartDetails[0]} formik={formik} />
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
