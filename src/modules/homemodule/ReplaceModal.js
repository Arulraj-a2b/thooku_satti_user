import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {getCartDetailsMiddleWare} from '../hotelviewmodule/store/hotelListViewMiddleware';
import {deleteCartMiddleWare} from '../mycartmodule/store/myCartMiddleware';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  placeText: {
    marginBottom: 4,
  },
  cancelBtn: {
    marginRight: 16,
    width: 120,
  },
  btnContainer: {
    marginTop: 20,
  },
});

const ReplaceModal = ({
  open,
  close,
  getCartDetails,
  isSelectHotelName,
  navigation,
}) => {
  const [isLoader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    close();
  };

  const handleMyOrder = () => {
    setLoader(true);
    dispatch(deleteCartMiddleWare()).then(res => {
      if (res && res.payload[0] === 'R') {
        dispatch(getCartDetailsMiddleWare()).then(() => {
          navigation.navigate(routesPath.HOTEL_LIST_VIEW_SCREEN, {
            hotelId: isSelectHotelName.id,
          });
          setLoader(false);
          close();
        });
      }
    });
  };

  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <Text size={20} bold overrideStyle={styles.placeText}>
          Replace cart item?
        </Text>
        <Text color="gray">
          Your cart contains dishes from {getCartDetails[0].HotelName}. Do you
          want to discard the selecttion and add dishes from{' '}
          {isSelectHotelName.name}?
        </Text>
        <Flex middle row overrideStyle={styles.btnContainer}>
          <Button
            disabled={isLoader}
            onClick={handleCancel}
            types={'secondary'}
            overrideStyle={styles.cancelBtn}>
            No
          </Button>
          <Button
            disabled={isLoader}
            isLoader={isLoader}
            overrideStyle={{width: 120}}
            onClick={handleMyOrder}>
            Replace
          </Button>
        </Flex>
      </Card>
    </Modal>
  );
};

export default memo(ReplaceModal);
