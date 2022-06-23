import React, {useMemo} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import Flex from '../Flex/Flex';
import {PRIMARY} from '../UikitUtils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 20,
    width,
    position: 'absolute',
  },
  loader: {
    opacity: 1,
  },
});

const Loader = () => {
  const memoisedStyle = useMemo(() => {
    return StyleSheet.flatten([styles.container]);
  }, []);

  return (
    <Flex flex={1} middle center overrideStyle={memoisedStyle}>
      <Flex>
        <ActivityIndicator size="large" style={styles.loader} color={PRIMARY} />
      </Flex>
    </Flex>
  );
};

export default Loader;
