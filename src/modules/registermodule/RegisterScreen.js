import React from "react";
import { StyleSheet, View } from "react-native";
import SvgLogo from "../../icons/SvgLogo";
import SvgPassword from "../../icons/SvgPassword";
import SvgUser from "../../icons/SvgUser";
import Button from "../../uikit/Button/Button";
import Flex from "../../uikit/Flex/Flex";
import InputText from "../../uikit/InputText/InputText";
import Text from "../../uikit/Text/Text";
import { PRIMARY, WHITE } from "../../uikit/UikitUtils/colors";

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: PRIMARY,
    paddingVertical: 40,
  },
  inputContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingLeft: 30,
  },
  overAll: {
    backgroundColor: WHITE,
  },
  footerStyle: {
    backgroundColor: PRIMARY,
    height: 70,
  },
  registerText: {
    marginBottom: 30,
  },
  marginTop16: {
    marginTop: 16,
  },
});

const RegisterScreen = () => {
  return (
    <Flex flex={1} overrideStyle={styles.overAll}>
      <Flex center middle overrideStyle={styles.logoContainer}>
        <SvgLogo width={200} height={100} />
      </Flex>

      <Flex flex={1} between>
        <Flex overrideStyle={styles.inputContainer}>
          <Text size={20} bold overrideStyle={styles.registerText}>
            Register
          </Text>
          <InputText
            actionLeftStyle={{ left: -4 }}
            actionLeft={() => <SvgUser />}
            placeholder="User Name"
          />
          <View style={styles.marginTop16}>
            <InputText
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="Email Address"
            />
          </View>
          <View style={styles.marginTop16}>
            <InputText
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="Mobile Number"
            />
          </View>
          <View style={styles.marginTop16}>
            <InputText
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="Whatsapp Number"
            />
          </View>
          <View style={styles.marginTop16}>
            <InputText
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="Address"
            />
          </View>
          <View style={[styles.marginTop16, { marginBottom: 30 }]}>
            <InputText
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="City"
            />
          </View>
          <Button>REGISTER</Button>
        </Flex>
        <View style={styles.footerStyle} />
      </Flex>
    </Flex>
  );
};

export default RegisterScreen;
