import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import SvgSuccess from '../../icons/SvgSccess';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';

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
  placeText: {
    marginTop: 8,
  },
});
const SuccessModal = ({open, close, isData, resetData}) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.navigate(routesPath.HOME_SCREEN);
    close();
    resetData();
  };
  const handleMyOrder = () => {
    resetData();
    navigation.navigate(routesPath.BOOKING_TABLE_SCREEN);
    close();
  };
  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <Flex center>
          <SvgSuccess height={60} width={60} />
        </Flex>
        <Text align={'center'} size={18} bold overrideStyle={styles.placeText}>
          {isData && isData.Message}
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
            Book Again
          </Button>
        </Flex>
      </Card>
    </Modal>
  );
};

export default SuccessModal;
