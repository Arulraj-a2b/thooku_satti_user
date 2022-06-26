import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SvgMail from '../../icons/SvgMail';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import {ERROR, PRIMARY} from '../../uikit/UikitUtils/colors';
import {
  INVALID_EMAIL_ENTERED,
  THIS_FIELD_REQUIRED,
} from '../../uikit/UikitUtils/constants';
import {isEmpty, isValidEmail} from '../../uikit/UikitUtils/validators';
import {forgotEamilOtpMiddleWare} from './store/forgotMiddleware';

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
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {isLoading} = useSelector(({forgotEamilOtpReducers}) => {
    return {
      isLoading: forgotEamilOtpReducers.isLoading,
    };
  });

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.email)) {
      errors.email = THIS_FIELD_REQUIRED;
    } else if (!isValidEmail(values.email)) {
      errors.email = INVALID_EMAIL_ENTERED;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {email: ''},
    onSubmit: values => handleSubmit(values),
    validate: handleValidate,
  });

  const handleSubmit = values => {
    Keyboard.dismiss()
    dispatch(
      forgotEamilOtpMiddleWare({EmailAddress: values.email, TypeID: 'FP'}),
    ).then(res => {
      if (res.payload && res.payload[0].Status === 'OTP Sent') {
        formik.resetForm();
        navigation.navigate(routesPath.FORGOT_PASSWORD_VERIFY_SCREEN);
      }
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex overrideStyle={styles.overAll}>
        <Text bold size={24} color="black" overrideStyle={styles.title}>
          Resset Password
        </Text>
        <Text color="gray" overrideStyle={styles.desStyle}>
          Please enter your email address to request a password reset
        </Text>
        <InputText
          keyboardType={'email-address'}
          name={'email'}
          touched={formik.touched}
          errors={formik.errors}
          error={formik.errors.email && formik.touched.email}
          maxLength={50}
          actionLeftStyle={{left: -4}}
          actionLeft={() => (
            <SvgMail
              fill={
                formik.errors.email && formik.touched.email ? ERROR : PRIMARY
              }
            />
          )}
          placeholder="Email Address *"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
        />
        <Button onClick={formik.handleSubmit} overrideStyle={styles.btnStyle}>
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default ForgotPasswordScreen;
