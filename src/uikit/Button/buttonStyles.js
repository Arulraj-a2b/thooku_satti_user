import {StyleSheet} from 'react-native';
import {SECONDARY} from '../UikitUtils/colors';

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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: SECONDARY,
    backgroundColor: 'rgba(255, 202, 41, 0.1)',
  },
  primaryBtn: {
    backgroundColor: SECONDARY,
  },
  disabled: {
    opacity: 0.5,
  },
  normal: {
    borderRadius: 4,
  },
  round: {
    borderRadius: 20,
  },
});
