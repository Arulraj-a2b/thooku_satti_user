import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgRightArrow from '../../icons/SvgRightArrow';
import SvgSearch from '../../icons/SvgSearch';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import {WHITE} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  inputStyle: {},
  inputContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
});
const HomeScreen = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.setItem('userData', JSON.stringify({}));
    navigation.navigate('LoginScreen');
  };

  return (
    <Flex overrideStyle={styles.overAll}>
      <Text size={30} bold>
        What would you like to order
      </Text>
      <View style={styles.inputContainer}>
        <InputText
          placeholder={'Find for food or restaurant...'}
          types={'normal'}
          overrideStyle={styles.inputStyle}
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
      <Button onClick={logout}>Logout</Button>
    </Flex>
  );
};

export default HomeScreen;
