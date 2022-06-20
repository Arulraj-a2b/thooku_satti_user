import { StyleSheet } from "react-native";
import { PRIMARY } from "../UikitUtils/colors";

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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  primaryBtn: {
    backgroundColor: PRIMARY,
  },
  disabled: {
    opacity: 0.5,
  },
});
