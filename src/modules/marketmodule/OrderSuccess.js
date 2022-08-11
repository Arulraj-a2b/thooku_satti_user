import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import SvgSuccess from '../../icons/SvgSccess';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cancelBtn: {
    marginRight: 16,
  },
  btnContainer: {
    marginTop: 24,
  },
  successText: {
    marginTop: 8,
  },
});

const OrderSuccess = ({open, close, orderId}) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    close();
    navigation.navigate(routesPath.ALL_SCREEN, {
      screen: 'BottomTab',
      params: {
        screen: routesPath.HOME_SCREEN,
      },
    });
  };

  const handleMyOrder = () => {
    close();
    navigation.navigate(routesPath.MARKET_ORDER_VIEW_SCREEN, {
      orderId: orderId,
    });
  };

  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <Flex center>
          <SvgSuccess height={60} width={60} />
        </Flex>
        <Text align={'center'} bold overrideStyle={styles.successText}>
          Your order successfully placed.
        </Text>
        <Text align={'center'} bold overrideStyle={styles.successText}>
          Order Id {orderId}
        </Text>
        <Flex middle row overrideStyle={styles.btnContainer}>
          <Button
            width={130}
            onClick={handleCancel}
            types={'secondary'}
            overrideStyle={styles.cancelBtn}>
            Go to Home
          </Button>
          <Button overrideStyle={{width: 130}} onClick={handleMyOrder}>
            View Details
          </Button>
        </Flex>
      </Card>
    </Modal>
  );
};

export default OrderSuccess;
