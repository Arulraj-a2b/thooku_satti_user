import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgRightArrow from '../../icons/SvgRightArrow';
import SvgSearch from '../../icons/SvgSearch';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
});

const HotelSearch = () => {
  return (
    <Flex>
      <Text size={30} bold>
        What would you like to order
      </Text>
      <View style={styles.inputContainer}>
        <InputText
          placeholder={'Find for food or restaurant...'}
          types={'normal'}
          actionLeft={() => <SvgSearch />}
          height={50}
        />
      </View>
      <Flex row center between middle>
        <Text size={20} bold>
          Featured Restaurants
        </Text>
        <Flex row center>
          <Text color="theme" bold overrideStyle={{marginRight: 4}}>
            View All
          </Text>
          <SvgRightArrow />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HotelSearch