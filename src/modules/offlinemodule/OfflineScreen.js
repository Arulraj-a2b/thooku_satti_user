import React from 'react';
import {StyleSheet, NativeModules} from 'react-native';
import SvgNoInternet from '../../icons/SvgNoInternet';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  oopsText: {
    marginBottom: 8,
  },
  btnStyle: {
    marginVertical: 30,
  },
});

const OfflineScreen = () => {
  const handleRelod = () => {
    RNRestart.Restart();
  };
  return (
    <Flex flex={1} middle center>
      <SvgNoInternet />
      <Text color="black" size={24} bold overrideStyle={styles.oopsText}>
        No internet Connection
      </Text>
      <Text size={14} color="gray" align="center">
        Your internet connection is currently not available please check or try
        again.
      </Text>
      <Button onClick={handleRelod} overrideStyle={styles.btnStyle}>
        Try Again
      </Button>
    </Flex>
  );
};

export default OfflineScreen;
