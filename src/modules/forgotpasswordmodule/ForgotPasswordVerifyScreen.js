import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {THIS_FIELD_REQUIRED} from '../../uikit/UikitUtils/constants';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {PRIMARY} from '../../uikit/UikitUtils/colors';

const styles = StyleSheet.create({
  overAll: {
    padding: 24,
  },
  title: {
    marginTop: 50,
  },
  desStyle: {
    marginBottom: 30,
  },
  btnStyle: {
    marginTop: 50,
    marginBottom: 30,
  },
  underlineStyleBase: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    color: PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  underlineStyleHighLighted: {
    borderColor: PRIMARY,
  },
  sendContainer: {
    marginTop: 16,
  },
});

const ForgotPasswordVerifyScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate(routesPath.CREATE_PASSWORD_SCREEN);
  };

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.code)) {
      errors.code = THIS_FIELD_REQUIRED;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {code: ''},
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  return (
    <Flex overrideStyle={styles.overAll}>
      <Text bold size={24} color="black" overrideStyle={styles.title}>
        Resset Password
      </Text>
      <Text color="gray" overrideStyle={styles.desStyle}>
        Please enter your email address to request a password reset
      </Text>

      <OTPInputView
        style={{width: '100%', height: 80}}
        pinCount={4}
        code={formik.values.code}
        onCodeChanged={code => {
          formik.setFieldValue('code', code);
        }}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <Flex row center middle overrideStyle={styles.sendContainer}>
        <Text>I don’t recevie a code! </Text>
        <Pressable style={{marginBottom: 4}}>
          <Text bold color="theme">
            Please resend
          </Text>
        </Pressable>
      </Flex>
      <Button
        disabled={formik.values.code.length !== 4}
        onClick={formik.handleSubmit}
        overrideStyle={styles.btnStyle}>
        Verify
      </Button>
    </Flex>
  );
};

export default ForgotPasswordVerifyScreen;
