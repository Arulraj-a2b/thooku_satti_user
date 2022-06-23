import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import SvgAddress from '../../icons/SvgAddress';
import SvgLocation from '../../icons/SvgLocation';
import SvgLock from '../../icons/SvgLock';
import SvgLogo from '../../icons/SvgLogo';
import SvgMail from '../../icons/SvgMail';
import SvgPassword from '../../icons/SvgPassword';
import SvgPhone from '../../icons/SvgPhone';
import SvgUser from '../../icons/SvgUser';
import SvgWhatsApp from '../../icons/SvgWhatsApp';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import {ERROR, PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import {THIS_FIELD_REQUIRED} from '../../uikit/UikitUtils/constants';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import PhoneInputText from '../../uikit/PhoneInputText/PhoneInputText';

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
  footerStyle: {
    backgroundColor: PRIMARY,
    height: 70,
  },
  registerText: {
    marginBottom: 30,
  },
  marginTop16: {
    marginTop: 20,
  },
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  mobileNumber: '',
  whatsappNumber: '',
  address: '',
  city: '',
};

const RegisterScreen = () => {
  const navigattion = useNavigation();
  const [isWhatsAppsFocus, setWhatsAppsFocus] = useState(false);

  const handleSubmit = value => {};

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.firstName)) {
      errors.firstName = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.lastName)) {
      errors.lastName = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.email)) {
      errors.email = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.mobileNumber)) {
      errors.mobileNumber = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.whatsappNumber)) {
      errors.whatsappNumber = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.address)) {
      errors.address = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.city)) {
      errors.city = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.confirmPassword)) {
      errors.confirmPassword = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.password)) {
      errors.password = THIS_FIELD_REQUIRED;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validate: handleValidate,
  });
  return (
    <ScrollView>
      <Flex flex={1} overrideStyle={styles.overAll}>
        <Flex center middle overrideStyle={styles.logoContainer}>
          <SvgLogo width={350} height={130} />
        </Flex>

        <Flex flex={1} between>
          <Flex overrideStyle={styles.inputContainer}>
            <Text size={20} bold overrideStyle={styles.registerText}>
              Register
            </Text>
            <Flex row flex={1}>
              <View style={{flex: 7}}>
                <InputText
                  name={'firstName'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.firstName && formik.touched.firstName}
                  maxLength={30}
                  actionLeftStyle={{left: -4}}
                  actionLeft={() => (
                    <SvgUser
                      fill={
                        formik.errors.firstName && formik.touched.firstName
                          ? ERROR
                          : PRIMARY
                      }
                    />
                  )}
                  placeholder="First Name *"
                  value={formik.values.firstName}
                  onChange={formik.handleChange('firstName')}
                />
              </View>
              <View style={{flex: 5, marginLeft: 8}}>
                <InputText
                  name={'lastName *'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.lastName && formik.touched.lastName}
                  maxLength={20}
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange('lastName')}
                />
              </View>
            </Flex>

            <View style={styles.marginTop16}>
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
                      formik.errors.email && formik.touched.email
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="Email Address *"
                value={formik.values.email}
                onChange={formik.handleChange('email')}
              />
            </View>
            <View style={styles.marginTop16}>
              <InputText
                keyboardType={'phone-pad'}
                name={'mobileNumber'}
                touched={formik.touched}
                errors={formik.errors}
                error={
                  formik.errors.mobileNumber && formik.touched.mobileNumber
                }
                actionLeftStyle={{left: -4}}
                actionLeft={() => (
                  <SvgPhone
                    fill={
                      formik.errors.mobileNumber && formik.touched.mobileNumber
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="Mobile Number *"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange('mobileNumber')}
              />
            </View>
            <View style={styles.marginTop16}>
              <PhoneInputText
                placeholder="Whatsapp Number *"
                actionLeft={() => (
                  <SvgWhatsApp
                    fill={
                      formik.errors.whatsappNumber &&
                      formik.touched.whatsappNumber
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                error={
                  formik.errors.whatsappNumber && formik.touched.whatsappNumber
                }
                onChange={formik.handleChange('whatsappNumber')}
              />
            </View>
            <ErrorMessage
              name={'whatsappNumber'}
              touched={formik.touched}
              errors={formik.errors}
            />
            <View style={styles.marginTop16}>
              <InputText
                maxLength={20}
                actionLeftStyle={{left: -4}}
                actionLeft={() => (
                  <SvgLock
                    fill={
                      formik.errors.password && formik.touched.password
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="Password *"
                value={formik.values.password}
                onChange={formik.handleChange('password')}
                name={'password'}
                touched={formik.touched}
                errors={formik.errors}
                error={formik.errors.password && formik.touched.password}
              />
            </View>
            <View style={styles.marginTop16}>
              <InputText
                maxLength={20}
                actionLeftStyle={{left: -4}}
                actionLeft={() => (
                  <SvgPassword
                    fill={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="Confirm password *"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange('confirmPassword')}
                name={'confirmPassword'}
                touched={formik.touched}
                errors={formik.errors}
                error={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
              />
            </View>
            <View style={styles.marginTop16}>
              <InputText
                maxLength={4000}
                actionLeftStyle={{left: -4}}
                actionLeft={() => (
                  <SvgLocation
                    fill={
                      formik.errors.address && formik.touched.address
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="Address *"
                value={formik.values.address}
                onChange={formik.handleChange('address')}
                name={'address'}
                touched={formik.touched}
                errors={formik.errors}
                error={formik.errors.address && formik.touched.address}
              />
            </View>
            <View style={[styles.marginTop16, {marginBottom: 30}]}>
              <InputText
                maxLength={25}
                actionLeftStyle={{left: -4}}
                actionLeft={() => (
                  <SvgAddress
                    fill={
                      formik.errors.city && formik.touched.city
                        ? ERROR
                        : PRIMARY
                    }
                  />
                )}
                placeholder="City / Town *"
                value={formik.values.city}
                onChange={formik.handleChange('city')}
                name={'city'}
                touched={formik.touched}
                errors={formik.errors}
                error={formik.errors.city && formik.touched.city}
              />
            </View>
            <Button onClick={formik.handleSubmit}>REGISTER</Button>
            <Flex middle row center overrideStyle={{marginTop: 16}}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigattion.navigate('LoginScreen')}>
                <Text bold color="theme" overrideStyle={{paddingBottom: 3}}>
                  Login
                </Text>
              </TouchableOpacity>
            </Flex>
          </Flex>
          <View style={styles.footerStyle} />
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default RegisterScreen;
