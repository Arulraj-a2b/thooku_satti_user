import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';
import {aboutMiddleWare} from '../loginmodule/store/loginScreenMiddleware';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    marginBottom: 12,
  },
  foundFlex: {
    marginTop: 16,
  },
  founder: {
    fontStyle: 'italic',
  },
  content: {
    marginBottom: 8
  },
});
const AboutScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutMiddleWare());
  }, []);

  const {isLoading, data} = useSelector(({aboutReducers}) => {
    return {
      isLoading: aboutReducers.isLoading,
      data: aboutReducers.data,
    };
  });
  const getContent = data && data[0].Content.match(/(?!$)[^?]*\??/g);
  return (
    <Flex overrideStyle={styles.overAll} flex={1}>
      {isLoading && <Loader />}
      <Text size={18} bold overrideStyle={styles.title}>
        {data && data[0].Title}
      </Text>
      {getContent &&
        getContent.map((list, index) => {
          return (
            <Text overrideStyle={styles.content}>
              {index + 1+"." + ' ' + list.replace('?', '')}
            </Text>
          );
        })}

      <Flex end overrideStyle={styles.foundFlex}>
        <Text overrideStyle={styles.founder}>
          - {data && data[0].FounderName}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AboutScreen;
