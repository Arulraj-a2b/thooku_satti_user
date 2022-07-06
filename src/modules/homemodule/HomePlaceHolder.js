import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Flex from '../../uikit/Flex/Flex';

const styles = StyleSheet.create({
  title: {
    height: 50,
    width: '100%',
    marginTop: 16
  },
  search: {
    height: 40,
    width: '100%',
    marginTop: 24,
  },
  overAll: {
    marginHorizontal: 24,
    paddingVertical: 30,
  },
  viewAll: {
    height: 20,
    width: '100%',
    marginTop: 24,
  },
  img: {
    height: 150,
    borderRadius: 8,
    width: '100%',
    marginTop: 24,
  },
});

const HomePlaceHolder = () => {
  const data = [{name: ''}, {name: ''}, {name: ''}];
  return (
    <Flex overrideStyle={styles.overAll}>
      {data.map((_list, index) => {
        return (
          <SkeletonPlaceholder key={index.toString()}>
            <View style={styles.title} />
            <View style={styles.search} />
            <View style={styles.viewAll} />
            <Flex>
              <View style={styles.img} />
            </Flex>
          </SkeletonPlaceholder>
        );
      })}
    </Flex>
  );
};

export default HomePlaceHolder;
