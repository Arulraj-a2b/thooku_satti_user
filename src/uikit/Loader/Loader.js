import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {PRIMARY} from '../UikitUtils/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    height: height,
  },
  loader: {
    opacity: 1,
  },
});

const Loader = () => {
  return (
    <Modal animationType="none" transparent={true} visible={true}>
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} color={PRIMARY} />
      </SafeAreaView>
    </Modal>
  );
};

export default Loader;
