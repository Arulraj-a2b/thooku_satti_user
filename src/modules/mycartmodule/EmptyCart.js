import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import SvgBbq from '../../icons/SvgBbq';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  btn: {
    marginTop: 24,
  },
  des: {
    marginTop: 24,
  },
});

const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <Flex center middle flex={1}>
      <SvgBbq />
      <Text align={'center'} color="gray" overrideStyle={styles.des}>
        Your cart is empty. Add something
      </Text>
      <Text align={'center'} color="gray">
        from the menu
      </Text>
      <Button
        onClick={() => navigation.navigate(routesPath.HOME_SCREEN)}
        overrideStyle={styles.btn}
        types={'secondary'}>
        Browse Restaurants
      </Button>
    </Flex>
  );
};

export default EmptyCart;
