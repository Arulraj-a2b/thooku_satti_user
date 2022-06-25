import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import SvgBack from '../icons/SvgBack';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {PRIMARY, WHITE} from '../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  boxStyle: {
    backgroundColor: WHITE,
    marginRight: 16,
    padding: 6,
    borderRadius: 8,
  },
});
const Header = ({props, isBack}) => {
  return (
    <Flex overrideStyle={styles.overAll}>
      <Flex row center>
        {!isBack && (
          <Pressable
            style={styles.boxStyle}
            onPress={() => props.navigation.goBack()}>
            <SvgBack />
          </Pressable>
        )}
        <Text color="white" bold size={20}>
          {props.options.title}
        </Text>
      </Flex>
      {/* <TouchableOpacity onPress={() => props.navigation.navigate('SideNav')}>
        <SvgHamburger fill={WHITE} width={30} height={20} />
      </TouchableOpacity> */}
    </Flex>
  );
};

export default Header;
