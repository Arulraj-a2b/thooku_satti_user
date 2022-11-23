import React from 'react';
import {View} from 'react-native';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import {PRIMARY} from '../UikitUtils/colors';

const InputRadio = ({checked, label}) => {
  return (
    <Flex row center>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: PRIMARY,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        {checked ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: PRIMARY,
            }}
          />
        ) : null}
      </View>
      <Text overrideStyle={{marginLeft: 8}}>{label}</Text>
    </Flex>
  );
};

export default InputRadio;
