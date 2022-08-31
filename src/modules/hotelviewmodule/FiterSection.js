import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import SvgFilter from '../../icons/SvgFilter';
import SvgSearch from '../../icons/SvgSearch';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';

const styles = StyleSheet.create({
  overAll: {
    marginVertical: 10,
  },
  inputStyle: {
    marginBottom: 16,
  },
});

const FiterSection = ({handleOpen, isValue, setValue}) => {
  return (
    <View>
      <Flex row center between overrideStyle={styles.overAll}>
        <Text bold size={20}>
          Sort By
        </Text>
        <Pressable onPress={handleOpen}>
          <SvgFilter />
        </Pressable>
      </Flex>
      <View style={styles.inputStyle}>
        <InputText
          placeholder={'Search your food...'}
          value={isValue}
          onChange={setValue}
          types="normal"
          actionRight={() => <SvgSearch />}
        />
      </View>
    </View>
  );
};

export default FiterSection;
