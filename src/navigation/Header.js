import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import SvgBack from '../icons/SvgBack';
import SvgHamburger from '../icons/SvgHamburger';
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
  hamburgerStyle: {
    padding: 12,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
});

const Header = ({props, isBack}) => {
  return (
    <Flex between row center overrideStyle={styles.overAll}>
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
      <Pressable
        style={styles.hamburgerStyle}
      //   onPress={() => 
      //   props.navigation.navigate('SideNav')
      // }
        >
        <SvgHamburger fill={WHITE} width={14} height={8} />
      </Pressable>
    </Flex>
  );
};

export default Header;
