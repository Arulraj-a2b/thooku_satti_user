import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Loader from '../../uikit/Loader/Loader';
import {ERROR, PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import {
  INVALID_EMAIL_ENTERED,
  INVALID_PHONE_ENTERED,
  THIS_FIELD_REQUIRED,
} from '../../uikit/UikitUtils/constants';
import {
  isEmpty,
  isValidEmail,
  isValidPassword,
} from '../../uikit/UikitUtils/validators';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import PhoneInputText from '../../uikit/PhoneInputText/PhoneInputText';
import {useDispatch} from 'react-redux';
import {signInMiddleWare} from './store/registerScreenReducerMiddleware';
import Toast from '../../uikit/Toast/Toast';
import SvgEyeOutline from '../../icons/SvgEyleOutLine';
import SvgEye from '../../icons/SvgEye';

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
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const [isWhatsAppValue, setWhatsAppValue] = useState('');
  const [isLoader, setLoader] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);

  const handleSubmit = value => {
    setLoader(true);
    dispatch(
      signInMiddleWare({
        Name: `${value.firstName} ${value.lastName}`,
        EmailAddress: value.email,
        Mobileno: value.mobileNumber,
        WhatsappNo: value.whatsappNumber,
        Address: value.address,
        Password: value.password,
        City: value.city,
      }),
    )
      .then(res => {
        setLoader(false);
        if (
          res.payload &&
          Array.isArray(res.payload) &&
          res.payload[0].Message === 'Success'
        ) {
          navigattion.navigate('LoginScreen');
          Toast('Account create successfully','success');
          formik.resetForm()
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.firstName)) {
      errors.firstName = THIS_FIELD_REQUIRED;
    } else if (values.firstName.length < 2) {
      errors.firstName = 'Please enter a valid name';
    }

    if (isEmpty(values.lastName)) {
      errors.lastName = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.email)) {
      errors.email = THIS_FIELD_REQUIRED;
    } else if (!isValidEmail(values.email)) {
      errors.email = INVALID_EMAIL_ENTERED;
    }

    if (isEmpty(values.mobileNumber)) {
      errors.mobileNumber = THIS_FIELD_REQUIRED;
    } else if (values.mobileNumber.length !== 10) {
      errors.mobileNumber = INVALID_PHONE_ENTERED;
    }

    if (isEmpty(values.whatsappNumber)) {
      errors.whatsappNumber = THIS_FIELD_REQUIRED;
    } else if (isWhatsAppValue.length !== 10) {
      errors.whatsappNumber = INVALID_PHONE_ENTERED;
    }

    if (isEmpty(values.address)) {
      errors.address = THIS_FIELD_REQUIRED;
    } else if (values.address.length < 15) {
      errors.address = 'Please enter a valid city name';
    }

    if (isEmpty(values.password)) {
      errors.password = THIS_FIELD_REQUIRED;
    } else if (!isValidPassword(values.password)) {
      errors.password = `Password must be at least 8 - 12 characters long, at least one lowercase and one uppercase`;
    }

    if (isEmpty(values.confirmPassword)) {
      errors.confirmPassword = THIS_FIELD_REQUIRED;
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = `The two password fields didn't match.`;
    }

    if (isEmpty(values.city)) {
      errors.city = THIS_FIELD_REQUIRED;
    } else if (values.city.length < 3) {
      errors.city = 'Please enter a valid city name';
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
        {isLoader && <Loader />}
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
                  name={'lastName'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.lastName && formik.touched.lastName}
                  maxLength={20}
                  placeholder="Last Name *"
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
                maxLength={10}
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
                ref={phoneInput}
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
                onChangeText={val => {
                  setWhatsAppValue(val);
                }}
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
                maxLength={12}
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
                secureTextEntry={hidePassword}
                actionRight={() => (
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                  </TouchableOpacity>
                )}
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
                secureTextEntry={hidePassword1}
                actionRight={() => (
                  <TouchableOpacity
                    onPress={() => setHidePassword1(!hidePassword1)}>
                    {hidePassword1 ? <SvgEyeOutline /> : <SvgEye />}
                  </TouchableOpacity>
                )}
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
            <Button
              onClick={() => {
                Keyboard.dismiss();
                formik.handleSubmit();
              }}>
              REGISTER
            </Button>
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
          {/* <View style={styles.footerStyle} /> */}
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default RegisterScreen;
