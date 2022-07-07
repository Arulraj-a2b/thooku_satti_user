import {StyleSheet} from 'react-native';
import {
  BORDER_COLOR,
  ERROR,
  GRAY_5,
  PRIMARY,
  WHITE,
} from '../UikitUtils/colors';
import {ZINDEX} from '../UikitUtils/constants';

export const inputTextStyles = StyleSheet.create({
  common: {
    borderWidth: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    width: '100%',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  actionLeftStyle: {
    position: 'absolute',
    left: 16,
    zIndex: ZINDEX,
  },
  actionRightStyle: {
    position: 'absolute',
    right: 16,
    zIndex: ZINDEX,
  },
  actionLeftInputStyle: {
    paddingLeft: 50,
    paddingRight: 16,
  },
  actionRightInputStyle: {
    paddingLeft: 16,
    paddingRight: 40,
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  selected: {
    borderColor: PRIMARY,
  },
  error: {
    borderColor: ERROR,
  },
  commonBorder: {
    borderColor: BORDER_COLOR,
  },
  normal: {
    borderRadius: 8,
  },
  round: {
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: GRAY_5,
    borderStyle: 'dashed',
  },
});
