import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import SvgSuccess from '../../icons/SvgSccess';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    maxHeight: '80%',
    paddingVertical: 20,
  },
  placeText: {
    marginTop: 20,
    marginBottom: 4,
  },
  cancelBtn: {
    marginRight: 16,
    width: 120,
  },
  btnContainer: {
    marginTop: 30,
  },
});

const OrderSuccessModal = ({open, close, navigation, checkOutData}) => {
  const handleCancel = () => {
    navigation.navigate(routesPath.HOME_SCREEN);
    close();
  };
  const handleMyOrder = () => {
    navigation.navigate(routesPath.MY_ORDER_SCREEN);
    close();
  };
  return (
    <Modal animationInTiming={0} animationIn="slideInDown" isVisible={open}>
      <Flex middle center overrideStyle={styles.overAll}>
        <SvgSuccess height={100} width={100} />
        <Text align={'center'} size={20} bold overrideStyle={styles.placeText}>
          Your order placed successfully
        </Text>
        <Text color="gray" bold>
          #{checkOutData && checkOutData[0].OrderID}
        </Text>
        <Flex row overrideStyle={styles.btnContainer}>
          <Button
            onClick={handleCancel}
            types={'secondary'}
            overrideStyle={styles.cancelBtn}>
            Close
          </Button>
          <Button overrideStyle={{width: 120}} onClick={handleMyOrder}>
            My Order
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default memo(OrderSuccessModal);
