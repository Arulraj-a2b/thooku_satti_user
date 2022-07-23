import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, SECONDARY, WHITE} from '../../uikit/UikitUtils/colors';
import DiningListScreen from './DiningListScreen';
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
  const [isTab, setTab] = useState('upcoming');
  const [isLoader, setLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setTab('upcoming');
      setLoader(true);
    }, []),
  );
  const handleUpComing = () => {
    setLoader(true);
    setTab('upcoming');
  };
  const handleHistory = () => {
    setLoader(true);
    setTab('history');
  };
  const handleDining = () => {
    setLoader(true);
    setTab('dining');
  };

  return (
    <Flex overrideStyle={styles.overAll}>
      <Flex row center overrideStyle={styles.tabContainer}>
        <TouchableOpacity
          onPress={handleUpComing}
          style={[
            isTab === 'upcoming' ? styles.tabFocus : {},
            styles.tabCommon,
          ]}>
          <Text bold>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHistory}
          style={[
            isTab === 'history' ? styles.tabFocus : {},
            styles.tabCommon,
          ]}>
          <Text bold>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDining}
          style={[isTab === 'dining' ? styles.tabFocus : {}, styles.tabCommon]}>
          <Text bold>Dining List</Text>
        </TouchableOpacity>
      </Flex>
      {isTab === 'upcoming' && (
        <UpComingOrder isLoader={isLoader} setLoader={setLoader} />
      )}
      {isTab === 'history' && (
        <HistoryOrder isLoader={isLoader} setLoader={setLoader} />
      )}
      {isTab === 'dining' && (
        <DiningListScreen isLoader={isLoader} setLoader={setLoader} />
      )}
    </Flex>
  );
};

export default MyOrderScreen;
