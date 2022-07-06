import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, SECONDARY, WHITE} from '../../uikit/UikitUtils/colors';
import HistoryOrder from './HistoryOrder';
import UpComingOrder from './UpComingOrder';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  tabContainer: {
    backgroundColor: WHITE,
    borderRadius: 30,
    height: 60,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginHorizontal: 20,
    marginTop: 20,
  },
  tabFocus: {
    backgroundColor: SECONDARY,
    margin: 3,
  },
  tabCommon: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 30,
  },
});
const MyOrderScreen = () => {
  const [isTab, setTab] = useState(false);
  const [isLoader, setLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setTab(false);
      setLoader(true);
    }, []),
  );
  const handleUpComing = () => {
    setLoader(true);
    setTab(false);
  };
  const handleHistory = () => {
    setLoader(true);
    setTab(true);
  };

  return (
    <Flex overrideStyle={styles.overAll}>
      <Flex row center overrideStyle={styles.tabContainer}>
        <TouchableOpacity
          onPress={handleUpComing}
          style={[!isTab ? styles.tabFocus : {}, styles.tabCommon]}>
          <Text bold>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHistory}
          style={[isTab ? styles.tabFocus : {}, styles.tabCommon]}>
          <Text bold>History</Text>
        </TouchableOpacity>
      </Flex>
      {!isTab ? (
        <UpComingOrder isLoader={isLoader} setLoader={setLoader} />
      ) : (
        <HistoryOrder isLoader={isLoader} setLoader={setLoader} />
      )}
    </Flex>
  );
};

export default MyOrderScreen;
