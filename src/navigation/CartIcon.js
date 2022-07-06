import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgCart from '../icons/SvgCart';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {GRAY_4, PRIMARY, SECONDARY_1} from '../uikit/UikitUtils/colors';
import {isEmpty} from '../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    position: 'relative',
  },
  count: {
    backgroundColor: SECONDARY_1,
    position: 'absolute',
    right: -10,
    top: -10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
});
const CartIcon = ({focused, count}) => {
  return (
    <Flex overrideStyle={styles.overAll}>
      {count && !isEmpty(count) && (
        <View style={styles.count}>
          <Text size={10} color="white" bold>
            {count}
          </Text>
        </View>
      )}
      <SvgCart width={26} height={26} fill={focused ? PRIMARY : GRAY_4} />
    </Flex>
  );
};

export default CartIcon;
