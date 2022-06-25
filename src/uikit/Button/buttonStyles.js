import {StyleSheet} from 'react-native';
import {GRAY_3, SECONDARY} from '../UikitUtils/colors';

export const buttonStyles = StyleSheet.create({
  smallHeight: {
    height: 30,
  },
  mediumHeight: {
    height: 40,
  },
  largeHeight: {
    height: 50,
  },
  common: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // elevation: 1,
    // shadowColor: BLACK,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.06,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: GRAY_3,
  },
  primaryBtn: {
    backgroundColor: SECONDARY,
  },
  disabled: {
    opacity: 0.5,
  },
});
