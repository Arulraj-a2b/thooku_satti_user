import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  listConatiner: {
    marginTop: 16,
    marginBottom: 30,
  },
  confirmBtn: {
    marginLeft: 16,
  },
});

const CheckOutModal = ({open, cancel, handleCheckOut}) => {
  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <Text bold size={16}>
          Payment Mode
        </Text>
        <Flex overrideStyle={styles.listConatiner}>
          <InputRadio checked={true} label="Cash on Delivery" />
        </Flex>
        <Flex row>
          <Flex flex={1}>
            <Button onClick={cancel} types={'secondary'}>
              Cancel
            </Button>
          </Flex>
          <Flex flex={1} overrideStyle={styles.confirmBtn}>
            <Button onClick={handleCheckOut}>Confirm</Button>
          </Flex>
        </Flex>
      </Card>
    </Modal>
  );
};

export default CheckOutModal;
