import React, {useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgLogo from '../../icons/SvgLogo';
import SvgPassword from '../../icons/SvgPassword';
import SvgUser from '../../icons/SvgUser';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import {ERROR, PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import {
  INVALID_EMAIL_ENTERED,
  INVALID_PASSWORD,
  THIS_FIELD_REQUIRED,
} from '../../uikit/UikitUtils/constants';
import {isEmpty, isValidEmail} from '../../uikit/UikitUtils/validators';
import {loginMiddleWare} from './store/loginScreenMiddleware';
import Loader from '../../uikit/Loader/Loader';
import SvgEye from '../../icons/SvgEye';
import SvgEyeOutline from '../../icons/SvgEyleOutLine';
import {useAuthCheck} from '../../utility/config';
import {routesPath} from '../../routes/routesPath';

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: PRIMARY,
    paddingVertical: 20,
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
    zIndex: 11,
  },
  loginText: {
    marginBottom: 30,
  },
  forgotStyle: {
    alignItems: 'center',
    marginTop: 16,
  },
});

const initialValues = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  useAuthCheck();

  const {isLoading} = useSelector(({loginReducers}) => {
    return {
      isLoading: loginReducers.isLoading,
    };
  });

  const handleSubmit = async value => {
    await AsyncStorage.getItem('fcmToken').then(tokenRes => {
      dispatch(
        loginMiddleWare({
          Username: value.email,
          Password: value.password,
          DeviceToken: tokenRes,
        }),
      ).then(res => {
        if (
          res.payload &&
          Array.isArray(res.payload) &&
          res.payload[0].Message === 'Success'
        ) {
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...res.payload[0], loggedIn: true}),
          );
          formik.resetForm();
          navigation.navigate(routesPath.HOME_SCREEN);
        }
      });
    });
  };

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.email)) {
      errors.email = THIS_FIELD_REQUIRED;
    } else if (!isValidEmail(values.email)) {
      errors.email = INVALID_EMAIL_ENTERED;
    }
    if (isEmpty(values.password)) {
      errors.password = THIS_FIELD_REQUIRED;
    } else if (values.password.length < 8 || values.password.length > 16) {
      errors.password = INVALID_PASSWORD;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  return (
    <Flex flex={1} overrideStyle={styles.overAll}>
      {isLoading && <Loader />}
      <Flex center middle overrideStyle={styles.logoContainer}>
        <SvgLogo width={350} height={130} />
      </Flex>
      <Flex flex={1} between>
        <Flex overrideStyle={styles.inputContainer}>
          <Text size={20} bold overrideStyle={styles.loginText}>
            Login Here
          </Text>

          <InputText
            keyboardType={'email-address'}
            name={'email'}
            touched={formik.touched}
            errors={formik.errors}
            error={formik.errors.email && formik.touched.email}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            actionLeftStyle={{left: -4}}
            actionLeft={() => (
              <SvgUser
                fill={
                  formik.errors.email && formik.touched.email ? ERROR : PRIMARY
                }
              />
            )}
            placeholder="Email Address"
          />
          <View style={{marginVertical: 20, marginBottom: 20}}>
            <InputText
              name={'password'}
              touched={formik.touched}
              errors={formik.errors}
              error={formik.errors.password && formik.touched.password}
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              actionLeftStyle={{left: -4}}
              actionLeft={() => (
                <SvgPassword
                  fill={
                    formik.errors.password && formik.touched.password
                      ? ERROR
                      : PRIMARY
                  }
                />
              )}
              placeholder="Password"
              secureTextEntry={hidePassword}
              actionRight={() => (
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routesPath.FORGOT_PASSWORD_SCREEN)
              }
              style={styles.forgotStyle}>
              <Text bold color="theme">
                Forgot password ?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            onClick={() => {
              Keyboard.dismiss();
              formik.handleSubmit();
            }}>
            LOGIN
          </Button>
          <Button
            onClick={() => navigation.navigate(routesPath.REGISTER_SCREEN)}
            overrideStyle={styles.registerBtn}
            types="secondary">
            REGISTER HERE
          </Button>
        </Flex>
        <View style={styles.footerStyle} />
      </Flex>
    </Flex>
  );
};

export default LoginScreen;
