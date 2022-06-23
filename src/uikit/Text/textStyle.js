import { StyleSheet } from "react-native";
import {
  BLACK,
  ERROR,
  GARY_1,
  LINK,
  PRIMARY,
  SUCCESS,
  WHITE,
} from "../UikitUtils/colors";
export const textStyles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  primaryColor: {
    color: BLACK,
  },
  whiteColor: {
    color: WHITE,
  },
  blackColor: {
    color: BLACK,
  },
  themColor: {
    color: PRIMARY,
  },
  gray: {
    color: GARY_1,
  },
  common: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  semiBold: {
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  fontFamilyLight: {
    fontFamily: "Poppins-Light",
  },
  successColor: {
    color: SUCCESS,
  },
  linkColor: {
    color: LINK,
  },
  errorColor: {
    color: ERROR,
  },
});
