import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import SvgLogo from "../../icons/SvgLogo";
import SvgPassword from "../../icons/SvgPassword";
import SvgUser from "../../icons/SvgUser";
import Button from "../../uikit/Button/Button";
import Flex from "../../uikit/Flex/Flex";
import InputText from "../../uikit/InputText/InputText";
import Text from "../../uikit/Text/Text";
import { PRIMARY, WHITE } from "../../uikit/UikitUtils/colors";
import { loginMiddleWare } from "./store/loginScreenMiddleware";

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
  registerBtn: {
    marginVertical: 20,
  },
  footerStyle: {
    backgroundColor: PRIMARY,
    height: 70,
  },
  loginText: {
    marginBottom: 30,
  },
});

const initialValues = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    dispatch(
      loginMiddleWare({
        Username: value.email,
        Password: value.password,
        DeviceToken: "str",
      })
    );
  };
  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Flex flex={1} overrideStyle={styles.overAll}>
      <Flex center middle overrideStyle={styles.logoContainer}>
        <SvgLogo width={200} height={100} />
      </Flex>
      <Flex flex={1} between>
        <Flex overrideStyle={styles.inputContainer}>
          <Text size={20} bold overrideStyle={styles.loginText}>
            Login Here
          </Text>

          <InputText
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            actionLeftStyle={{ left: -4 }}
            actionLeft={() => <SvgUser />}
            placeholder="Email Address"
          />
          <View style={{ marginVertical: 20, marginBottom: 40 }}>
            <InputText
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              actionLeftStyle={{ left: -4 }}
              actionLeft={() => <SvgPassword />}
              placeholder="Password"
            />
          </View>
          <Button onClick={formik.handleSubmit}>LOGIN</Button>
          <Button
            onClick={() => navigation.navigate("RegisterScreen")}
            overrideStyle={styles.registerBtn}
            types="secondary"
          >
            REGISTER HERE
          </Button>
        </Flex>
        <View style={styles.footerStyle} />
      </Flex>
    </Flex>
  );
};

export default LoginScreen;
