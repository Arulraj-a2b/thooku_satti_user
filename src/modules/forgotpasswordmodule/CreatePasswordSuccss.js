import {useNavigation} from '@react-navigation/native';
import React from 'react';
import { StyleSheet} from 'react-native';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgSuccess from '../../icons/SvgSccess';

const styles = StyleSheet.create({
  overAll: {
    padding: 24,
  },
  title: {
    marginTop: 8,
  },
  desStyle: {
    marginBottom: 30,
  },
  btnStyle: {
    marginTop: 50,
    marginBottom: 30,
  },
});

const CreatePasswordSuccss = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate(routesPath.LOGIN_SCREEN);
  };
  return (
    <Flex middle flex={1} overrideStyle={styles.overAll}>
      <Flex center>
        <SvgSuccess height={100} width={100} />
        <Text bold size={24} color="black" overrideStyle={styles.title}>
          Password created
        </Text>
        <Text bold size={24} color="black">
          successfully
        </Text>
      </Flex>

      <Button onClick={handleSubmit} overrideStyle={styles.btnStyle}>
        Login
      </Button>
    </Flex>
  );
};

export default CreatePasswordSuccss;
